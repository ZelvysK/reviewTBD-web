import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "axios-hooks";
import { User } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { Loader } from "../../loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

const schema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
});

type UpdatePasswordForm = z.infer<typeof schema>;

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { headers } = useAuth();

  const [{ data, loading, error }] = useAxios<User>({
    url: getUrl(["user", userId]),
    headers,
  });

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["user", "update", userId]),
      method: "POST",
      headers,
    },
    { manual: true }
  );

  const onSubmit = async (data: UpdatePasswordForm) => {
    try {
      const response = await executeUpdate({ data: { id: userId, ...data } });

      if (response.status === 200) {
        navigate(`../../user/${userId}`);
        toast.success("Password updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  const { formState, handleSubmit, register } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <div className="label">
          <span className="label-text">Current Password:</span>
        </div>
        <input
          {...register("currentPassword")}
          type="password"
          placeholder="Current Password..."
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <ErrorMessage
          name="currentPassword"
          errors={formState.errors}
          render={({ message }) => <p className="text-error">{message}</p>}
        />
        <div className="flex flex-col gap-2">
          <div className="label">
            <span className="label-text">New Password:</span>
          </div>
          <input
            {...register("newPassword")}
            type="password"
            placeholder="New Password..."
            className="input input-bordered input-sm w-full max-w-xs"
          />
          <ErrorMessage
            name="newPassword"
            errors={formState.errors}
            render={({ message }) => <p className="text-error">{message}</p>}
          />
        </div>
      </div>
    </form>
  );
};
