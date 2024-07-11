import { gql } from "@/__generated__";
import { Loader } from "@/components/loader";
import { useMutation, useQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { StudioForm, StudioFormData } from "../-components/studio-form";
import { STUDIO_BY_ID_QUERY } from "../-components/types";

export const Route = createFileRoute("/_layout/studios/$studioId/edit")({
  component: () => <EditStudioPage />,
});

const UPDATE_STUDIO_MUTATION = gql(/* GraphQL */ `
  mutation UpdateStudio($input: UpdateStudioInput!) {
    updateStudio(input: $input) {
      studio {
        id
      }
    }
  }
`);

const EditStudioPage = () => {
  const { studioId } = Route.useParams();
  const navigate = Route.useNavigate();

  const [updateStudio] = useMutation(UPDATE_STUDIO_MUTATION, {
    refetchQueries: [
      {
        query: STUDIO_BY_ID_QUERY,
        variables: { id: studioId },
      },
    ],
  });

  const { data, loading } = useQuery(STUDIO_BY_ID_QUERY, {
    variables: { id: studioId },
  });

  const studio = data?.studioById;

  if (!studio || loading) {
    return <Loader />;
  }

  const studioForEdit = {
    name: studio.name,
    studioType: studio.studioType,
    dateEstablished: new Date(studio.dateEstablished),
    description: studio.description ?? "",
    imageUrl: studio.imageUrl ?? "",
    headquarters: studio.headquarters,
    founder: studio.founder,
  } satisfies StudioFormData;

  const handleUpdate = async (data: StudioFormData) => {
    const response = await updateStudio({
      variables: { input: { id: studioId, ...data } },
    });

    if (response.errors) {
      toast.error("Failed to update studio 🥲");
    }

    toast.success("Studio updated successfully");

    navigate({
      to: "/studios/$studioId",
      params: { studioId },
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Edit Studio</h1>
      <StudioForm initialData={studioForEdit} onSubmit={handleUpdate} />
    </>
  );
};
