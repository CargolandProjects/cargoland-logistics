const DepartmentStore = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M21 4H3C2.45 4 2 4.45 2 5V19C2 19.55 2.45 20 3 20H21C21.55 20 22 19.55 22 19V5C22 4.45 21.55 4 21 4ZM4 6H20V8H4V6ZM9 18V14H11V18H9ZM13 18V14H15V18H13ZM17 18V13C17 12.45 16.55 12 16 12H8C7.45 12 7 12.45 7 13V18H4V10H20V18H17Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DepartmentStore;
