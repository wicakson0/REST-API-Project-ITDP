import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="navbar bg-base-300">
      <NavLink
        to="/"
        className="btn btn-ghost text-4xl text-center p-2 font-serif italic"
      >
        Warung Bang Jack
      </NavLink>

      <div className="ml-auto">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/informasi"
              className={({ isActive }) =>
                isActive ? "btn btn-active" : "btn btn-ghost"
              }
            >
              <button className="btn btn-active btn-info">Informasi</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
