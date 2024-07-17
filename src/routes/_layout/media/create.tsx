import { gql } from "@/__generated__";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { MediaForm, MediaFormData } from "./-components/media-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/media/create")({
  component: () => <CreateMediaPage />,
});

const CREATE_MEDIA_MUTATION = gql(/* GraphQL */ `
  mutation CreateMedia($input: CreateMediaInput!) {
    createMedia(input: $input) {
      media {
        id
      }
    }
  }
`);

const CreateMediaPage = () => {
  const navigate = Route.useNavigate();
  const [createMedia] = useMutation(CREATE_MEDIA_MUTATION);

  const handleCreate = async (data: MediaFormData) => {
    const response = await createMedia({
      variables: { input: data },
    });

    const createdMediaId = response.data?.createMedia?.media?.id;

    if (response.errors || !createdMediaId) {
      toast.error("Failed to create media 🥲");
      return;
    }

    toast.success("Media created successfully");

    navigate({
      to: "/media/$mediaId",
      params: { mediaId: createdMediaId },
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Create Media</h1>
      <MediaForm onSubmit={handleCreate} />
    </>
  );
};
