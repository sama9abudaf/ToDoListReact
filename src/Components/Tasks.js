import React from "react";

const Tasks = ({ children }) => {
  return (
    <ul className="flex gab-5 flex-col pl-16 pr-16 gap-5 rounded-md">
      {children}
    </ul>
  );
};

export default Tasks;
