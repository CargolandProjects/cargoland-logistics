const ArrowUpRight = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      className={`${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.64 10.9485L6.69001 5.99848H18.002V17.3135L13.052 12.3635L7.39601 18.0215L5.98102 16.6065L11.64 10.9485Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowUpRight;
