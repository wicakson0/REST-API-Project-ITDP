import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar bg-base-300">
        <button
          className="btn btn-ghost text-xl text-center"
          onClick={() => navigate("/")}
        >
          Warung Bang Jack & Bang Daniels
        </button>
      </div>
    </>
  );
}

export default Header;
