import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { Option, StudioOptions, StudioType } from "../../types";
import useAxios from "axios-hooks";
import { getUrl } from "../../utils/navigation";

export const AddStudio = () => {
  // const [studioType, setStudioType] =
  //   useState<SingleValue<Option<StudioType>>>(null);
  const [studioType, setStudioType] =
    useState<SingleValue<Option<StudioType>>>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateCreated, setDateCreated] = useState("");

  const [{ loading, error }, executePost] = useAxios(
    {
      url: getUrl("studio"),
      method: "post",
    },
    { manual: true }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      Name: title,
      Description: description,
      ImageUrl: imageUrl,
      DateFounded: dateCreated,
      StudioType: studioType ? studioType.value : null,
    };

    await executePost({ data: postData });

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
          value={title}
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
