const Package = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M4 7.5V16.5L12 21L20 16.5V7.5L12 3L4 7.5ZM20 7.5L12 12M12 21V12M4 7.5L12 12M16 5.25L8 9.75"
        stroke="currentColor"
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Package;
