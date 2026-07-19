const Plane = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      className={`${props.className}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.5567 11.6531L29.2167 5.99146C29.8539 5.36461 30.7129 5.01493 31.6068 5.01858C32.5006 5.02224 33.3568 5.37893 33.9888 6.01097C34.6209 6.64302 34.9776 7.4992 34.9812 8.39303C34.9849 9.28686 34.6352 10.1459 34.0083 10.7831L28.3467 16.4431L31.41 31.6848C31.8017 33.6348 28.02 36.3515 27.0133 33.7681L22.53 22.2615L16.7083 28.0831C16.9917 31.4848 17.0533 32.6165 14.6683 34.9998L11.0433 28.9565L5 25.3315C7.38333 22.9465 8.515 23.0065 11.9167 23.2915L17.7383 17.4715L6.23167 12.9865C3.64833 11.9798 6.365 8.19646 8.315 8.58979L23.5567 11.6531Z"
        stroke="currentColor"
        strokeWidth={props.strokeWidth || "2.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Plane;
