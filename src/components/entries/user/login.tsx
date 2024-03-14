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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthData } from "../../../auth";
import { useAuth } from "../../../hooks/use-auth";
import { getUrl } from "../../../utils/navigation";

const loginSchema = z.object({
  email: z.string().min(3, "Please enter your email"),
  password: z.string().min(3, "Please enter your password"),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      new RegExp(
        /^(?=.*[!@#$%^&*()_+}{:;'?/>,.<\[\]\-~`|\\])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
      ),
      "Pasword is not secure"
    ),
});

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [_register, executeRegister] = useAxios(
    {
      url: getUrl("register"),
      method: "post",
    },
    {
      manual: true,
    }
  );

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      await login(data.email, data.password);
      navigate("../../");
      toast.success("Login successful");
    } catch (error) {
      toast.error("Failed");
    }
  };

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      const response = await executeRegister({ data });

      if (response.status === 200) {
        toast.success("Registered successfuly, please login");
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold pb-3">Review TDB</h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onLogin)}
              className="space-y-6"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="register">
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
                      <Input placeholder="Email" {...field} />
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
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      {/* <div className="form-control w-full max-w-xs ">
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
      </div> */}
    </div>
  );
};
