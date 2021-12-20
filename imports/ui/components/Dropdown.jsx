import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Meteor } from "meteor/meteor";
import { authenticated } from "../store/index";

export const Dropdown = () => {
  const [auth, setAuth] = useRecoilState(authenticated);
  const [hidden, setHidden] = React.useState(true);
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    Meteor.logout((error) => {
      if (error) console.log(error);
      else {
        setAuth({ check: false, user: [] });
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setHidden(!hidden)}
        >
          {auth.user.profile.name}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ${
          hidden ? "hidden" : ""
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          <Link
            to="/user/"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-1"
          >
            My Dashboard
          </Link>
        </div>
        <div className="py-1" role="none">
          <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-1"
            onClick={handleLogOut}
          >
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
};
