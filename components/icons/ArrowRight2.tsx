const ArrowRight2 = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      className={`${props.className}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.00003 4C6.00003 4 10 6.94593 10 8C10 9.05413 6 12 6 12"
        stroke="#5F6574"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight2;
