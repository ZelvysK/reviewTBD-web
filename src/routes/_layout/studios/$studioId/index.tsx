import { gql } from "@/__generated__";
import { AdminOnly } from "@/components/admin-only";
import { Loader } from "@/components/loader";
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
import { useMutation, useQuery } from "@apollo/client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { STUDIO_BY_ID_QUERY } from "../-components/types";

export const Route = createFileRoute("/_layout/studios/$studioId/")({
  component: () => <StudioPage />,
});

const DELETE_STUDIO_MUTATION = gql(/* GraphQL */ `
  mutation DeleteStudio($input: DeleteStudioInput!) {
    deleteStudio(input: $input) {
      studio {
        id
      }
    }
  }
`);

const StudioPage = () => {
  const { studioId } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data, loading } = useQuery(STUDIO_BY_ID_QUERY, {
    variables: { id: studioId },
  });

  const [deleteStudio] = useMutation(DELETE_STUDIO_MUTATION, {
    variables: { input: { id: studioId } },
    refetchQueries: [
      {
        query: STUDIO_BY_ID_QUERY,
        variables: { id: studioId },
      },
    ],
  });

  const studio = data?.studioById;

  if (!studio || loading) {
    return <Loader />;
  }

  const handleDelete = async () => {
    const response = await deleteStudio();

    if (response.errors) {
      toast.error("Failed to delete studio 🥲");
    }

    toast.success("Studio deleted 🥳");

    navigate({
      to: "/studios",
    });
  };

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <img
        src={studio.imageUrl ?? undefined}
        alt="Oopsie, image wasn't good"
        className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-64"
      />
      <div className="flex flex-col gap-7">
        <h1 className="text-5xl font-bold">
          {studio.name + " | " + studio.studioType}
        </h1>
        <div className="font-semibold">
          {studio.headquarters + " | " + studio.founder}
        </div>
        <div className="font-semibold">{studio.description}</div>
        <div className="font-semibold">
          Date established: {format(studio.dateEstablished, "yyyy-MM-dd")}
        </div>
      </div>
      <AdminOnly>
        <div className="flex gap-2">
          <Link to="/studios/$studioId/edit" params={{ studioId: studio.id }}>
            <Button>Update Studio</Button>
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
