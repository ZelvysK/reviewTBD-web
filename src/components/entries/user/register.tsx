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
import { useAuthStore } from "@/hooks/use-auth";
import { getUrl } from "@/utils/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const registerSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[!@#$%^&*()_+}{:;'?/>,.<\[\]\-~`|\\])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        ),
        "Pasword is not secure"
      ),
    confirmPassword: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[!@#$%^&*()_+}{:;'?/>,.<\[\]\-~`|\\])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        ),
        "Pasword is not secure"
      ),
    phoneNumber: z
      .string()
      .min(7)
      .max(15)
      .regex(
        new RegExp(/^\+(?:[0-9]●?){6,14}[0-9]$/),
        "Phone number is invalid"
      ),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const Register = () => {
  const navigate = useNavigate();
  const { auth, user, login, refresh } = useAuthStore();

  const [_register, executeRegister] = useAxios(
    {
      url: getUrl("register"),
      method: "post",
    },
    { manual: true }
  );

  const [_update, executeUpdate] = useAxios(
    {
      url: getUrl(["user", "update", user?.id]),
      method: "post",
      headers: createAuthHeader(auth),
    },
    { manual: true }
  );

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      const registerResponse = await executeRegister({ data });

      if (registerResponse.status === 200) {
        try {
          await login(data.email, data.password);
          navigate("../../");
        } catch (error) {
          toast.error("Failed login");
        }
        toast.success("Registered successfuly!");
        const updateResponse = await executeUpdate({ data });

        if (updateResponse.status === 200) {
          await refresh();
          toast.success("User updated successfully");
        }
      }
    } catch (error) {
      console.log(error);
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
          name="username"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Phone number"
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
