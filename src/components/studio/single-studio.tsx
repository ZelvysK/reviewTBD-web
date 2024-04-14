import { createAuthHeader } from "@/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useAxios from "axios-hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../hooks/use-auth";
import { Studio } from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { AdminOnly } from "../admin-only";

export const SingleStudio = () => {
  const navigate = useNavigate();
  const { auth } = useAuthStore();
  const { studioId } = useParams();
  const [{ data, loading, error }] = useAxios<Studio>(
    {
      url: getUrl(["studio", studioId]),
      headers: createAuthHeader(auth),
    },
    { useCache: false, manual: !auth?.accessToken }
  );

  const [_delete, executeDelete] = useAxios(
    {
      url: getUrl(["studio", studioId]),
      method: "delete",
      headers: createAuthHeader(auth),
    },
    { manual: true }
  );

  const handleDelete = async () => {
    const response = await executeDelete();

    console.log(response);

    if (response.status === 204) {
      navigate("../../");
    }
  };

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <img
        src={data?.imageUrl}
        alt="Oopsie, image wasn't good"
        className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-48"
      />
      <div>
        <h1 className="text-5xl font-bold">{data?.name + " |" + data?.type}</h1>
        <div className="font-semibold">
          {data?.headquarters + " | " + data?.founder}
        </div>
        <div className="font-semibold">{data?.description}</div>
        <div className="font-semibold">
          {format(data?.dateCreated, "yyyy-MM-dd")}
        </div>
      </div>
      <AdminOnly>
        <div className="flex gap-2">
          <Link to={`/studio/update/${data.id}`}>
            <Button> Update Studio</Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline">Delete studio</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this entry and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AdminOnly>
    </div>
  );
};
