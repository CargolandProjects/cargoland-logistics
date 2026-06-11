import { Loader2 } from "lucide-react";

const Loader = ({ size = 24, styles }: { size?: number; styles?: string }) => {
  return (
    <Loader2
      style={{ width: size, height: size }}
      className={`${styles}
        animate-spin duration-300 text-primary`}
    />
  );
};

export default Loader;
