import useAxios from "axios-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import {
  NewStudio,
  Option,
  StudioOptions,
  StudioType,
  StudioTypes,
} from "../../types";
import { getUrl } from "../../utils/navigation";

type CreateStudioResponse = {
  id: string;
  message: string;
};

export const AddStudio = () => {
  const navigate = useNavigate();
  const [studioType, setStudioType] =
    useState<SingleValue<Option<StudioType>>>();
  const [name, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateCreated, setDateCreated] = useState("");

  const [{ loading, error }, executePost] = useAxios<CreateStudioResponse>(
    {
      url: getUrl("studio"),
      method: "post",
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

    const postData: NewStudio = {
      name,
      description,
      imageUrl,
      dateCreated,
      type,
    };

    const { data } = await executePost({ data: postData });

    const { id } = data;

    navigate(`../../studio/${id}`);

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
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
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
          value={name}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="label">
          <span className="label-text">Image URL:</span>
        </div>
        <input
          type="text"
          placeholder="URL"
          className="input input-bordered w-full max-w-xs"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className="label">
          <span className="label-text">Date Founded:</span>
        </div>
        <input
          type="text"
          placeholder="Date (YYYY-MM-DD)"
          className="input input-bordered w-full max-w-xs"
          value={dateCreated}
          onChange={(e) => setDateCreated(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-active btn-ghost mt-4 w-80"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};
