const EditCircle = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM11.325 5.3025C11.43 5.3025 11.535 5.34 11.625 5.4225L12.5775 6.375C12.75 6.54 12.75 6.8025 12.5775 6.96L11.8275 7.71L10.29 6.1725L11.04 5.4225C11.115 5.34 11.22 5.3025 11.325 5.3025ZM9.8475 6.6075L11.3925 8.1525L6.8475 12.6975H5.3025V11.1525L9.8475 6.6075Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default EditCircle;
