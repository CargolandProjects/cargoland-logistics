const CurveArrowRight = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      className={`${props.className}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.74988 6C4.42512 6.20988 2.25 10.5972 2.25 15C2.25 15 5.15988 10.7322 9.74988 10.5"
        stroke="#273583"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 10.5002V13.5001L15.4729 8.82732C15.5578 8.75695 15.6261 8.66874 15.673 8.56897C15.7199 8.46919 15.7442 8.3603 15.7442 8.25006C15.7442 8.13982 15.7199 8.03093 15.673 7.93115C15.6261 7.83138 15.5578 7.74317 15.4729 7.6728L9.75 3V6.00024"
        stroke="#E32027"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CurveArrowRight;
