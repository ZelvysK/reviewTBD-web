import { AuthData, UserData } from "@/auth";
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
import axios from "axios";
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

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [_register, executeRegister] = useAxios(
    {
      url: getUrl("register"),
      method: "post",
    },
    { manual: true }
  );

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      const registerResponse = await executeRegister({ data });

      const { username, email, password } = data;

      if (registerResponse.status === 200) {
        const loginResponse = await axios.post<AuthData>(getUrl("login"), {
          email,
          password,
        });

        if (loginResponse.status !== 200) {
          throw new Error("Failed to login");
        }

        const headers = {
          Authorization: `Bearer ${loginResponse.data.accessToken}`,
        };

        const meResponse = await axios.get<UserData>(getUrl(["user", "me"]), {
          headers,
        });

        if (meResponse.status !== 200) {
          throw new Error("Failed to fetch user after succesful login");
        }

        const updateResponse = await axios.post<UserData>(
          getUrl(["user", "update", meResponse.data.id]),
          data,
          {
            headers,
          }
        );

        if (updateResponse.status === 200) {
          await login(username, password);
          toast.success(`Welcome, ${username}!`);
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops, something went wrong...");
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
