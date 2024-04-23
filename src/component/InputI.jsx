/* eslint-disable react/display-name */
import React from "react";

const InputI = React.forwardRef(({ ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="m-2 text-gray-900 dark:text-white border-0border-gray-400 w-full bg-transparent text-sm focus:outline-none focus:ring-0"
    />
  );
});

export default InputI;
