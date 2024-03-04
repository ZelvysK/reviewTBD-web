import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";
import { User } from "../../../types";
import useAxios, { clearCache } from "axios-hooks";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../../loader";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string(),
});

type UpdateUserForm = z.infer<typeof schema>;

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { headers } = useAuth();

  const [{ data, loading, error }] = useAxios<User>({
    url: getUrl(["user", userId]),
    headers,
  });

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["user", userId]),
      method: "put",
      headers,
    },
    { manual: true }
  );

  const onSubmit = async (data: UpdateUserForm) => {
    try {
      const response = await executeUpdate({ data: { id: userId, ...data } });

      if (response.status === 200) {
        clearCache();
        navigate(`../../user/${userId}`);
        toast.success("User updated successfully");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register, control } = useForm<UpdateUserForm>({
    resolver: zodResolver(schema),
    values: data,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-48">
      <div className="form-control w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="label">
              <span className="label-text">Username:</span>
            </div>
            <input
              {...register("username")}
              type="text"
              placeholder="Username..."
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text">Email:</span>
            </div>
            <input
              {...register("email")}
              placeholder="Email..."
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text">Phone number:</span>
            </div>
            <input
              {...register("phoneNumber")}
              type="text"
              placeholder="Phone number..."
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
