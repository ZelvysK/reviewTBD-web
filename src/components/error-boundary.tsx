import { useAuthStore } from "@/hooks/use-auth";
import { useEffect } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const isUnauthorized = (error: string) => error.includes("401");

export const ErrorBoundary = () => {
  const error = useRouteError();
  const { refresh } = useAuthStore();
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

  useEffect(() => {
    const handleUnauthrized = async () => {
      if (isUnauthorized(errorMessage)) {
        await refresh();
        navigate("/");
      }
    };

    handleUnauthrized();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
        Ooopsie...
      </h1>
      <p className="text-2xl font-bold">
        Something went terribly wrong... 😰💦🍆
      </p>

      <p>{errorMessage}</p>
    </div>
  );
};
