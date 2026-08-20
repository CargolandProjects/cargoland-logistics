const Building = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M2.75 20.788H21.25M5.978 3.21204H12.916C13.652 3.21204 14.3578 3.5044 14.8782 4.02482C15.3986 4.54523 15.691 5.25106 15.691 5.98704V20.787H3.203V5.98704C3.203 5.25106 3.49537 4.54523 4.01578 4.02482C4.53619 3.5044 5.24202 3.21204 5.978 3.21204Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.67212 6.91309H12.2221M6.67212 10.6131H12.2221M15.6901 9.22509H17.5401C17.9047 9.22482 18.2658 9.29641 18.6027 9.43575C18.9396 9.57509 19.2457 9.77945 19.5036 10.0372C19.7615 10.2949 19.9661 10.6009 20.1057 10.9377C20.2453 11.2745 20.3171 11.6355 20.3171 12.0001V20.7881M8.53112 14.3131H10.3811C10.7491 14.3133 11.1019 14.4595 11.3623 14.7195C11.6227 14.9795 11.7693 15.3321 11.7701 15.7001V20.7881H7.14412V15.7001C7.14412 15.3322 7.29025 14.9794 7.55036 14.7193C7.81048 14.4592 8.16326 14.3131 8.53112 14.3131Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Building;
