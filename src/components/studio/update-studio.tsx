import useAxios from "axios-hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import {
  Option,
  Studio,
  StudioOptions,
  StudioType,
  StudioTypes,
} from "../../types";
import { getUrl } from "../../utils/navigation";
import { Loader } from "../loader";

type UpdateStudioResponse = {
  id: string;
  type: StudioType;
  name: string;
  description: string;
  imageUrl: string;
};

export const UpdateStudio = () => {
  const navigate = useNavigate();
  const [studioType, setStudioType] =
    useState<SingleValue<Option<StudioType>>>();
  const [name, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { studioId } = useParams();

  const [{ data, loading, error }] = useAxios<Studio>(
    getUrl(["studio", studioId])
  );

  if (error) {
    throw new Error(error.message);
  }

  const [{ loading: updateLoading, error: updateError }, executePut] =
    useAxios<UpdateStudioResponse>(
      {
        url: getUrl(["studio", "update", studioId]),
        method: "put",
      },
      { manual: true }
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const type = studioType?.value;

    if (!type) {
      return;
    }

    if (!StudioTypes.includes(type)) {
      throw new Error("Invalid studio type");
    }

    const putData = {
      name,
      description,
      imageUrl,
      type,
    };

    const { data } = await executePut({ data: putData });

    if (updateError) {
      throw new Error(updateError.message);
    }

    navigate(`../../studio/${studioId}`);
  };

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-48">
      <div className="form-control w-full max-w-xs">
        <form onSubmit={handleSubmit}>
          <div className="label">
            <span className="label-text">Studio type:</span>
          </div>
          <Select
            className="text-black"
            options={StudioOptions}
            placeholder="Select studio type"
            onChange={(item) => setStudioType(item)}
            defaultValue={studioType}
            isClearable={!!studioType}
          />
          <div className="label">
            <span className="label-text">Name:</span>
          </div>
          <input
            type="text"
            placeholder={data.name}
            className="input input-bordered w-full max-w-xs"
            value={name}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="form-control">
            <div className="label">
              <span className="label-text">Description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder={data.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <div className="label">
            <span className="label-text">Image URL:</span>
          </div>
          <input
            type="text"
            placeholder={data.imageUrl}
            className="input input-bordered w-full max-w-xs"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-active btn-ghost mt-4 w-80"
            disabled={updateLoading}
          >
            {updateLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
