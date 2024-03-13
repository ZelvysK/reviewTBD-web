import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "axios-hooks";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";
import { RoleTypes, User } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../form/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../utils/tabs";

const schema = z.object({
  userName: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().min(5),
  role: z.enum(RoleTypes),
});

type UpdateUserFormData = z.infer<typeof schema>;

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
      url: getUrl(["user", "update", userId]),
      method: "POST",
      headers,
    },
    { manual: true }
  );

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const response = await executeUpdate({ data: { id: userId, ...data } });

      if (response.status === 200) {
        navigate(`../../user/${userId}`);
        toast.success("User updated successfully");
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

  return (
    <div className="flex gap-48">
      <div className="form-control w-full max-w-xs">
        {data.role === "User" && (
          <UpdateUserForm user={data} submitData={onSubmit} />
        )}
        {data.role === "Admin" && (
          <UpdateUserFormTabs user={data} submitData={onSubmit} />
        )}
      </div>
    </div>
  );
};

interface Props {
  user: User;
  submitData: (data: UpdateUserFormData) => void;
}

const UpdateUserForm = ({ user, submitData: submit }: Props) => {
  const { formState, handleSubmit, register, control } =
    useForm<UpdateUserFormData>({
      resolver: zodResolver(schema),
      values: user,
    });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-2">
        <div className="label">
          <span className="label-text">Username:</span>
        </div>
        <input
          {...register("userName")}
          type="text"
          placeholder="Username..."
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <ErrorMessage
          name="userName"
          errors={formState.errors}
          render={({ message }) => <p className="text-error">{message}</p>}
        />

        {user.role === "Admin" && (
          <>
            <div className="label">
              <span className="label-text">Role:</span>
            </div>
            <Controller
              defaultValue={user.role}
              control={control}
              name="role"
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent className="bg-base-100">
                      <SelectGroup>
                        <SelectLabel>User roles</SelectLabel>
                        {RoleTypes.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <ErrorMessage
              name="role"
              errors={formState.errors}
              render={({ message }) => <p className="text-error">{message}</p>}
            />
          </>
        )}

        <div className="label">
          <span className="label-text">Email:</span>
        </div>
        <input
          type="email"
          {...register("email")}
          placeholder="Email..."
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <ErrorMessage
          name="email"
          errors={formState.errors}
          render={({ message }) => <p className="text-error">{message}</p>}
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
        <ErrorMessage
          name="phoneNumber"
          errors={formState.errors}
          render={({ message }) => <p className="text-error">{message}</p>}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <Link to={`/user/changePassword/${user.id}`} className="btn btn-info">
          Change password
        </Link>
      </div>
    </form>
  );
};

const UpdateUserFormTabs = ({ user, submitData: submit }: Props) => {
  const { formState, handleSubmit, register, control } =
    useForm<UpdateUserFormData>({
      resolver: zodResolver(schema),
      values: user,
    });

  return (
    <>
      <Tabs defaultValue="user" className="w-[400px]">
        <TabsList className="border border-white">
          <TabsTrigger value="user">User Update</TabsTrigger>
          <TabsTrigger value="admin">Admin Update</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-2">
              <div className="label">
                <span className="label-text">Username:</span>
              </div>
              <input
                {...register("userName")}
                type="text"
                placeholder="Username..."
                className="input input-bordered input-sm w-full max-w-xs"
              />
              <ErrorMessage
                name="userName"
                errors={formState.errors}
                render={({ message }) => (
                  <p className="text-error">{message}</p>
                )}
              />

              <div className="label">
                <span className="label-text">Email:</span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email..."
                className="input input-bordered input-sm w-full max-w-xs"
              />
              <ErrorMessage
                name="email"
                errors={formState.errors}
                render={({ message }) => (
                  <p className="text-error">{message}</p>
                )}
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
              <ErrorMessage
                name="phoneNumber"
                errors={formState.errors}
                render={({ message }) => (
                  <p className="text-error">{message}</p>
                )}
              />
            </div>
          </form>
        </TabsContent>

        <TabsContent value="admin">
          <div className="label">
            <span className="label-text">Role:</span>
          </div>
          <Controller
            defaultValue={user.role}
            control={control}
            name="role"
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent className="bg-base-100">
                    <SelectGroup>
                      <SelectLabel>User roles</SelectLabel>
                      {RoleTypes.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
          <ErrorMessage
            name="role"
            errors={formState.errors}
            render={({ message }) => <p className="text-error">{message}</p>}
          />
        </TabsContent>
      </Tabs>
      <div className="flex flex-col gap-2 mt-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <Link to={`/user/changePassword/${user.id}`} className="btn btn-info">
          Change password
        </Link>
      </div>
    </>
  );
};
