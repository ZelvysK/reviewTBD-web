import { createFileRoute } from "@tanstack/react-router";
import { StudioForm, StudioFormData } from "./-components/studio-form";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { gql } from "@/__generated__";

export const Route = createFileRoute("/_layout/studios/create")({
  component: () => <CreateStudioPage />,
});

const CREATE_STUDIO_MUTATION = gql(/* GraphQL */ `
  mutation CreateStudio($input: CreateStudioInput!) {
    createStudio(input: $input) {
      studio {
        id
      }
    }
  }
`);

const CreateStudioPage = () => {
  const navigate = Route.useNavigate();

  const [createStudio] = useMutation(CREATE_STUDIO_MUTATION);

  const handleCreate = async (data: StudioFormData) => {
    const response = await createStudio({
      variables: { input: data },
    });

    const createdStudioId = response.data?.createStudio?.studio?.id;

    if (response.errors || !createdStudioId) {
      toast.error("Failed to create studio 🥲");
    }

    toast.success("Studio created successfully");

    navigate({
      to: "/studios/$studioId",
      params: { studioId: createdStudioId },
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Create Studio</h1>
      <StudioForm onSubmit={handleCreate} />
    </>
  );
};
