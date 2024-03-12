import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../utils/tabs";

const isUnauthorizedError = (errorMessage: string) =>
  errorMessage.includes("401");

export const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
        Ooopsie...
      </h1>
      <p className="text-2xl font-bold">
        Something went terribly wrong... 😰💦🍆
      </p>

      {isUnauthorizedError(errorMessage) && (
        <>
          {/* <Tabs defaultValue="login" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="login">Account</TabsTrigger>
              <TabsTrigger value="register">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="register">
              Change your password here.
            </TabsContent>
          </Tabs> */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-outline"
            >
              Register
            </button>
          </div>
        </>
      )}

      <p>{errorMessage}</p>
    </div>
  );
};
