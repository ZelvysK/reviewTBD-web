export const ErrorBoundary = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
        Ooopsie...
      </h1>
      <p className="text-2xl font-bold">
        Something went terribly wrong... 😰💦🍆
      </p>
    </div>
  );
};
