import { createAuthHeader } from "@/auth";
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
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../../../hooks/use-auth";
import { User } from "../../../types";
import { getUrl } from "../../../utils/navigation";
import { Loader } from "../../loader";

const schema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[!@#$%^&*()_+}{:;'?/>,.<\[\]\-~`|\\])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        ),
        "Pasword is not secure"
      ),
    confirmNewPassword: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[!@#$%^&*()_+}{:;'?/>,.<\[\]\-~`|\\])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        ),
        "Pasword is not secure"
      ),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password and confirm new password fields should match",
        path: ["confirmNewPassword"],
      });
    }
    return ctx;
  });

type UpdatePasswordForm = z.infer<typeof schema>;

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { auth } = useAuthStore();

  const [{ data, loading, error }] = useAxios<User>({
    url: getUrl(["user", userId]),
    headers: createAuthHeader(auth),
  });

  const [_, executeUpdate] = useAxios(
    {
      url: getUrl(["user", "update", userId]),
      method: "POST",
      headers: createAuthHeader(auth),
    },
    { manual: true }
  );

  const onSubmit = async (data: UpdatePasswordForm) => {
    try {
      console.log(data);

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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Current password..."
                    {...field}
                    value={field.value ?? ""}
                    type="password"
                  />
                </FormControl>
                <FormMessage>
                  <ErrorMessage
                    name="currentPassword"
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New password..."
                    {...field}
                    value={field.value ?? ""}
                    type="password"
                  />
                </FormControl>
                <FormMessage>
                  <ErrorMessage
                    name="newPassword"
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
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm New password..."
                    {...field}
                    value={field.value ?? ""}
                    type="password"
                  />
                </FormControl>
                <FormMessage>
                  <ErrorMessage
                    name="confirmNewPassword"
                    errors={form.formState.errors}
                    render={({ message }) => (
                      <p className="text-error">{message}</p>
                    )}
                  />
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Change password</Button>
        </div>
      </form>
    </Form>
  );
};
