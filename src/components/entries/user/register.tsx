import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getUrl } from "../../../utils/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";

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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex gap-48 items-center justify-center">
      <div className="form-control w-full max-w-xs">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
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
                      name="username"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="password"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage>
                    <ErrorMessage
                      name="password"
                      errors={form.formState.errors}
                      render={({ message }) => (
                        <p className="text-error">{message}</p>
                      )}
                    />
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button type="submit">Register</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
