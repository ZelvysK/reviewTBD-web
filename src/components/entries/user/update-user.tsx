import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../../hooks/use-auth";
import { User } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";

const schema = z.object({
  userName: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().min(5),
});

type UpdateUserFormData = z.infer<typeof schema>;

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { headers, user, refresh } = useAuth();

  const [{ data, loading, error }] = useAxios<User>(
    {
      url: getUrl(["user", userId]),
      headers,
    },
    {
      manual: !user,
    }
  );

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
        await refresh();
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
        <UpdateUserForm user={data} submitData={onSubmit} />
      </div>
    </div>
  );
};

interface Props {
  user: User;
  submitData: (data: UpdateUserFormData) => void;
}

const UpdateUserForm = ({ user, submitData: submit }: Props) => {
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(schema),
    values: user,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage>
                  <ErrorMessage
                    name="userName"
                    errors={form.formState.errors}
                    render={({ message }) => (
                      <p className="text-error">{message}</p>
                    )}
                  />
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage>
                  <ErrorMessage
                    name="email"
                    errors={form.formState.errors}
                    render={({ message }) => (
                      <p className="text-error">{message}</p>
                    )}
                  />
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone number..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage>
                  <ErrorMessage
                    name="phoneNumber"
                    errors={form.formState.errors}
                    render={({ message }) => (
                      <p className="text-error">{message}</p>
                    )}
                  />
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>

          <Link to={`/user/changePassword/${user.id}`}>
            <Button variant="secondary"> Change password </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};
