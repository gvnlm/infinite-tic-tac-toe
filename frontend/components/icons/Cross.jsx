const Cross = (props) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="-1.2 -1.2 26.4 26.4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 5L5 19M5.00001 5L19 19"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Cross;
