import { Warning } from "./icons";

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
     <Warning className="size-24 text-primary" />
     
      <h3 className="text-lg leading-6  text-neutral-600 text-center font-roboto max-w-sm ">
        {message}
      </h3>
    </div>
  );
};

export default ErrorState;
