import React from "react";

function NotFound() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img
          src="/404-error-svgrepo-com.png"
          alt="404 Not Found"
          className="max-w-xs h-auto"
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-4xl">It ain't here big dawg</p>
      </div>
    </>
  );
}

export default NotFound;
