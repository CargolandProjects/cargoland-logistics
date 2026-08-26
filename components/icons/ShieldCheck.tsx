const ShieldCheck = (props: React.SVGProps<SVGSVGElement>) => {
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
      <g clip-path="url(#clip0_2854_20931)">
        <path
          d="M8 1.33301C9.66667 1.33301 11.2113 1.70234 12.4727 2.32967C13.0913 2.63767 13.4 2.79167 13.7 3.27567C14 3.75967 14 4.22767 14 5.16501V7.49101C14 11.2797 10.9713 13.3863 9.218 14.289L9.21404 14.291C8.72735 14.541 8.48336 14.6663 8 14.6663C7.51664 14.6663 7.27265 14.541 6.78596 14.291L6.782 14.289C5.028 13.3863 2 11.2803 2 7.49167V5.16501C2 4.22767 2.00067 3.75967 2.3 3.27567C2.59933 2.79167 2.90867 2.63767 3.52733 2.32967C4.78933 1.70234 6.33333 1.33301 8 1.33301Z"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 7.66634C6 7.66634 6.93867 7.83434 7.33333 8.99967C7.33333 8.99967 8.33333 6.99967 10 6.33301"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2854_20931">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ShieldCheck;
