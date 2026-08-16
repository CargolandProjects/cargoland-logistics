const HelpCircle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      className={`${props.className}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2712_5607)">
        <path
          d="M5.30233 5.24944C5.43949 4.85955 5.7102 4.53078 6.06653 4.32136C6.42286 4.11194 6.84181 4.03539 7.24918 4.10526C7.65654 4.17514 8.02603 4.38693 8.2922 4.70312C8.55837 5.01931 8.70405 5.41951 8.70344 5.83282C8.70344 6.99958 6.9533 7.58296 6.9533 7.58296M7.00006 9.91672H7.00589M12.8339 6.99982C12.8339 10.2217 10.222 12.8336 7.00006 12.8336C3.77814 12.8336 1.16626 10.2217 1.16626 6.99982C1.16626 3.7779 3.77814 1.16602 7.00006 1.16602C10.222 1.16602 12.8339 3.7779 12.8339 6.99982Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2712_5607">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HelpCircle;
