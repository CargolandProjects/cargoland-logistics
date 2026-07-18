const ArrowDownLeft = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M12.36 13.0515L17.31 18.0015H5.99799V6.68652L10.948 11.6365L16.604 5.97852L18.019 7.39352L12.36 13.0515Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowDownLeft;
