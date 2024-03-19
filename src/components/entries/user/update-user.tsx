import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../../hooks/use-auth";
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
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const { headers, user } = useAuth();

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
        {user?.role === "User" ||
          ("Admin" && <UpdateUserForm user={data} submitData={onSubmit} />)}
        {/* {user?.role === "Admin" && (
          <UpdateUserFormTabs user={data} submitData={onSubmit} />
        )} */}
      </div>
    </div>
  );
};

interface Props {
  user: User;
  submitData: (data: UpdateUserFormData) => void;
}

const UpdateUserForm = ({ user, submitData: submit }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
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

          {user.role === "Admin" && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-base-100">
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          {RoleTypes.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    <ErrorMessage
                      name="role"
                      errors={form.formState.errors}
                      render={({ message }) => (
                        <p className="text-error">{message}</p>
                      )}
                    />
                  </FormMessage>
                </FormItem>
              )}
            />
          )}

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

// const UpdateUserFormTabs = ({ user, submitData: submit }: Props) => {
//   const form = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     values: user,
//   });

//   return (
//     <>
//       <Tabs defaultValue="user" className="w-[400px]">
//         <TabsList className="border border-white">
//           <TabsTrigger value="user">User Update</TabsTrigger>
//           {user?.role === "Admin" && (
//             <TabsTrigger value="admin">Admin Update</TabsTrigger>
//           )}
//         </TabsList>
//         <TabsContent value="user">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(submit)}>
//               <FormField
//                 control={form.control}
//                 name="userName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Username</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Username..." {...field} />
//                     </FormControl>
//                     <FormMessage>
//                       <ErrorMessage
//                         name="userName"
//                         errors={form.formState.errors}
//                         render={({ message }) => (
//                           <p className="text-error">{message}</p>
//                         )}
//                       />
//                     </FormMessage>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Email..." {...field} />
//                     </FormControl>
//                     <FormMessage>
//                       <ErrorMessage
//                         name="email"
//                         errors={form.formState.errors}
//                         render={({ message }) => (
//                           <p className="text-error">{message}</p>
//                         )}
//                       />
//                     </FormMessage>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Phone number..." {...field} />
//                     </FormControl>
//                     <FormMessage>
//                       <ErrorMessage
//                         name="phoneNumber"
//                         errors={form.formState.errors}
//                         render={({ message }) => (
//                           <p className="text-error">{message}</p>
//                         )}
//                       />
//                     </FormMessage>
//                   </FormItem>
//                 )}
//               />
//             </form>
//           </Form>
//         </TabsContent>

//         <TabsContent value="admin">
//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Role</FormLabel>
//                 <FormControl>
//                   <Select onValueChange={field.onChange} {...field}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select role" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-base-100">
//                       <SelectGroup>
//                         <SelectLabel>Roles</SelectLabel>
//                         {RoleTypes.map((item) => (
//                           <SelectItem key={item} value={item}>
//                             {item}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormMessage>
//                   <ErrorMessage
//                     name="role"
//                     errors={form.formState.errors}
//                     render={({ message }) => (
//                       <p className="text-error">{message}</p>
//                     )}
//                   />
//                 </FormMessage>
//               </FormItem>
//             )}
//           />
//         </TabsContent>
//       </Tabs>
//       <div className="flex flex-col gap-2 mt-3">
//         <Button type="submit">Submit</Button>

//         <Link to={`/user/changePassword/${user.id}`}>
//           <Button variant="outline">Change password</Button>
//         </Link>
//       </div>
//     </>
//   );
// };
