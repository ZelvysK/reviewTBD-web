import { Loader } from "@/components/loader";
import { gql, useMutation, useQuery } from "@apollo/client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MEDIA_BY_ID_QUERY } from "../-components/types";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { AdminOnly } from "@/components/admin-only";
import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/_layout/media/$mediaId/")({
  component: () => <MediaPage />,
});

const DELETE_MEDIA_MUTATION = gql(/* GraphQL */ `
  mutation DeleteMedia($input: DeleteMediaInput!) {
    deleteMedia(input: $input) {
      media {
        id
      }
    }
  }
`);

const MediaPage = () => {
  const { mediaId } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data, loading } = useQuery(MEDIA_BY_ID_QUERY, {
    variables: { id: mediaId },
  });

  const [deleteMedia] = useMutation(DELETE_MEDIA_MUTATION, {
    variables: { input: { id: mediaId } },
    refetchQueries: [
      {
        query: MEDIA_BY_ID_QUERY,
        variables: { id: mediaId },
      },
    ],
  });

  const media = data?.mediaById;

  if (!media || loading) {
    return <Loader />;
  }

  const handleDelete = async () => {
    const response = await deleteMedia();

    if (response.errors) {
      toast.error("Failed to delete media 🥲");
    }

    toast.success("Media deleted 🥳");

    navigate({
      to: "/media",
    });
  };

  return (
    <div className="bg-secondary/30 shadow-xl rounded-xl flex flex-col gap-2 p-2">
      <img
        src={media.coverImageUrl ?? undefined}
        alt="Oopsie, image wasn't good"
        className="max-w-sm rounded-lg shadow-2xl object-scale-down h-75 w-64"
      />
      <div className="flex flex-col gap-7">
        <h1 className="text-5xl font-bold">
          {media.name + " | " + media.mediaType}
        </h1>
        <div className="font-semibold">{media.genre}</div>
        <div className="font-semibold">{media.description}</div>
        <div className="font-semibold">
          Date established: {format(media.dateEstablished, "yyyy-MM-dd")}
        </div>
      </div>
      <AdminOnly>
        <div className="flex gap-2">
          <Link to="/media/$mediaId/edit" params={{ mediaId: media.id }}>
            <Button>Update Media</Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline">Delete Media</Button>
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
