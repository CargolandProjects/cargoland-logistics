export default function NotFound () {
  return (
    <div className="h-screen flex flex-col justify-center items-center padding-x rounded-lg">
      <h2 className="text-[140px] font-semibold leading-[140px] text-primary">
        404
      </h2>
      <h2 className="text-2xl font-semibold leading-8 text-center">
        Page not found
      </h2>
      <p className="mt-4 text-base leeading-5 text-center text-gray-500 max-w-[432px]">
        Oops! Something went wrong while processing your request. Please try
        again or refresh the page to continue.
      </p>
    </div>
  );
};

