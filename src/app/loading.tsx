import React from "react";

const loading = () => {
  return (
    <div className="w-[100%]  flex-center h-full flex items-center absolute top-1/2">
      <div
        style={{ width: `${60}px`, height: `${60}px` }}
        className="animate-spin"
      >
        <div
          className="h-full w-full border-4 border-t-orange-500
         border-b-orange-700 rounded-[50%]"
        ></div>
      </div>
    </div>
  );
};

export default loading;
