import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getUrl } from "../../../utils/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AuthData, authAtom } from "../../../auth";
import { useAtom } from "jotai";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginForm = z.infer<typeof schema>;

export const Login = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useAtom(authAtom);

  const [_, executeLogin] = useAxios<AuthData>(
    {
      url: getUrl("login"),
      method: "post",
    },
    {
      manual: true,
    }
  );

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await executeLogin({ data });

      if (response.status === 200) {
        setAuthData(response.data);
        navigate("../../");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  const { handleSubmit, register } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex gap-48 items-center justify-center">
      <div className="form-control w-full max-w-xs ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="label">
              <span className="label-text">Email:</span>
            </div>
            <input
              {...register("email")}
              type="text"
              placeholder="Email/Username"
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

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
