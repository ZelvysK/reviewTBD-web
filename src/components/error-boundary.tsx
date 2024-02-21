import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

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
        <button onClick={() => navigate("/login")} className="btn btn-primary">
          Please login
        </button>
      )}

      <p>{errorMessage}</p>
    </div>
  );
};
