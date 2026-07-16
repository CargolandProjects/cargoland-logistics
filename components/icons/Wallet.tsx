const Wallet = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M20 7H4C2.9 7 2 7.9 2 9V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V18H17C15.9 18 15 17.1 15 16V13C15 11.9 15.9 11 17 11H22V9C22 7.9 21.1 7 20 7Z"
        fill="currentColor"
      />
      <path
        d="M17 12.9995H22V15.9995H17V12.9995ZM16.57 2.17947C16.4357 2.08662 16.2808 2.02805 16.1187 2.00888C15.9566 1.9897 15.7922 2.0105 15.64 2.06947L8.01001 4.99947H17V2.99947C17 2.66947 16.84 2.35947 16.57 2.17947Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Wallet;
