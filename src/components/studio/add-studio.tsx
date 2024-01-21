import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { Option, StudioType, StudioTypes } from "../../types";
import useAxios from "axios-hooks";
import { getUrl } from "../../utils/navigation";

const options: Option<StudioType>[] = StudioTypes.map((item) => ({
  value: item,
  label: item,
}));

export const AddStudio = () => {
  const [studioType, setStudioType] =
    useState<SingleValue<Option<StudioType>>>(null);

  const [{ data, loading, error }, executePost] = useAxios(
    {
      url: getUrl("studio/add"),
      method: "post",
    },
    { manual: true }
  );

  const handleSubmit = async () => {
    const postData = {
      Name: "Title",
      Description: "Description",
      ImageUrl: "ImageUrl",
      DateFounded: "DateCreated",
      StudioType: "StudioType",
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
          options={options}
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
        />
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
          ></textarea>
        </label>
        <div className="label">
          <span className="label-text">Image URL:</span>
        </div>
        <input
          type="text"
          placeholder="URL"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="label">
          <span className="label-text">Date Founded:</span>
        </div>
        <input
          type="text"
          placeholder="Date"
          className="input input-bordered w-full max-w-xs"
        />
        <button
          type="submit"
          className="btn btn-active btn-ghost"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
