import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();

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

      <p>{errorMessage}</p>
    </div>
  );
};
