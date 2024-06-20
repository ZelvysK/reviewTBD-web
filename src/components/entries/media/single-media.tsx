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
import { Button } from "@/components/ui/button";
import useAxios from "axios-hooks";
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { Media } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import { AdminOnly } from "@/components/admin-only";

export const SingleMedia = () => {
  const { mediaId } = useParams();
  const { auth } = useAuthStore();
  const [{ data, loading, error }] = useAxios<Media>({
    url: getUrl(["media", mediaId]),
    headers: createAuthHeader(auth),
  });

  const [_delete, executeDelete] = useAxios(
    {
      url: getUrl(["media", mediaId]),
      method: "delete",
      headers: createAuthHeader(auth),
    },
    {
      manual: true,
    },
  );

  const handleDelete = async () => {
    const response = await executeDelete();

    if (response.status === 204) {
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
        src={data?.coverImageUrl}
        alt="Oopsie, image wasn't good"
        className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-48"
      />
      <div>
        <h1 className="text-5xl font-bold">
          {data?.name + " |" + data?.mediaType}
        </h1>
        <div className="font-bold">{data?.genre}</div>
        <div className="font-bold">{data?.publishedBy}</div>
        <div className="font-semibold">{data?.description}</div>
        <div className="font-semibold">
          {format(data?.dateCreated, "yyyy-MM-dd")}
        </div>
      </div>
      <AdminOnly>
        <div className="flex gap-2">
          <Link to={`/media/update/${data.id}`}>
            <Button>Update media</Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline">Delete media</Button>
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
