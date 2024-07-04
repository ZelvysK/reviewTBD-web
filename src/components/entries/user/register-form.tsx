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
import { useAuthStore } from "@/hooks/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const registerSchema = z
  .object({
    displayName: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[!@#$%^&*()_+}{:;'?/>,.<[\]\-~`|\\])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        ),
        "Pasword is not secure",
      ),
    confirmPassword: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[!@#$%^&*()_+}{:;'?/>,.<[\]\-~`|\\])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        ),
        "Pasword is not secure",
      ),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const RegisterForm = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = data;

      await register(rest);
      navigate({
        to: "/about",
      });

      toast.success("Welcome!");
    } catch (error) {
      toast.error("Failed");
    }
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onRegister)}
        className="space-y-6"
      >
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type="password"
                  placeholder="Confirm password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};
