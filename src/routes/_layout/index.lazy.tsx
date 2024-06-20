import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/")({
  component: () => <Index />,
});

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      yo
    </div>
  );
};
