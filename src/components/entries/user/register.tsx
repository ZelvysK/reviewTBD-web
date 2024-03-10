import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterForm = z.infer<typeof schema>;

export const Register = () => {
  const navigate = useNavigate();

  const [_, executePost] = useAxios(
    {
      url: getUrl("register"),
      method: "post",
    },
    {
      manual: true,
    }
  );

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await executePost({ data });

      if (response.status === 200) {
        navigate("../../");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex gap-48 items-center justify-center">
      <div className="form-control w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="label">
              <span className="label-text">Username:</span>
            </div>
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="input input-bordered input-sm w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text">Email:</span>
            </div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered input-sm w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text">Password:</span>
            </div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text">Confirm password:</span>
            </div>
            <input
              {...register("password")}
              type="password"
              placeholder="Confirm password"
              className="input input-bordered input-sm w-full max-w-xs"
            />

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
