import { gql } from "@/__generated__";
import { createFileRoute } from "@tanstack/react-router";
import { MEDIA_BY_ID_QUERY } from "../-components/types";
import { Loader } from "@/components/loader";
import { MediaForm, MediaFormData } from "../-components/media-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";

export const Route = createFileRoute("/_layout/media/$mediaId/edit")({
  component: () => <EditMediaPage />,
});

const UPDATE_MEDIA_MUTATION = gql(/* GraphQL */ `
  mutation UpdateMedia($input: UpdateMediaInput!) {
    updateMedia(input: $input) {
      media {
        id
      }
    }
  }
`);

const EditMediaPage = () => {
  const { mediaId } = Route.useParams();
  const navigate = Route.useNavigate();

  const [updateMedia] = useMutation(UPDATE_MEDIA_MUTATION, {
    refetchQueries: [
      {
        query: MEDIA_BY_ID_QUERY,
        variables: { id: mediaId },
      },
    ],
  });

  const { data, loading } = useQuery(MEDIA_BY_ID_QUERY, {
    variables: { id: mediaId },
  });

  const media = data?.mediaById;

  if (!media || loading) {
    return <Loader />;
  }

  const mediaForEdit = {
    mediaType: media.mediaType,
    genre: media.genre,
    name: media.name,
    coverImageUrl: media.coverImageUrl ?? "",
    description: media.description ?? "",
    studioId: media.studioId,
    dateEstablished: new Date(media.dateEstablished),
  } satisfies MediaFormData;

  const handleUpdate = async (data: MediaFormData) => {
    const response = await updateMedia({
      variables: { input: { id: mediaId, ...data } },
    });

    if (response.errors) {
      toast.error("Failed to update media 🥲");
    }

    toast.success("Media updated successfully");

    navigate({
      to: "/media/$mediaId",
      params: { mediaId },
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Edit Media</h1>
      <MediaForm initialData={mediaForEdit} onSubmit={handleUpdate} />
    </>
  );
};
