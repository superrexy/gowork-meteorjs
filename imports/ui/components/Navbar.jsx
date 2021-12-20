import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../store/index";
import { Dropdown } from "./Dropdown";

const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authenticated);

  return (
    <nav className="bg-primary-300 text-white py-4 w-full absolute z-10">
      <div className="container">
        <div className="flex flex-row items-center">
          <div className="w-3/12">
            <Link className="text-3xl font-bold" to="/">
              Go-Work
            </Link>
          </div>
          {!auth.check ? (
            <div className="flex w-6/12 justify-around">
              <a href="/" className="font-semibold no-underline font-pop">
                Home
              </a>
              <a href="/" className="font-semibold no-underline">
                Benefit
              </a>
              <a href="/" className="font-semibold no-underline">
                Booking
              </a>
              <a href="/" className="font-semibold no-underline">
                About
              </a>
            </div>
          ) : (
            <div className="flex w-6/12 justify-around"></div>
          )}

          {!auth.check ? (
            <div className="flex w-3/12 justify-end">
              <Link
                className="px-8 py-3 rounded-2xl bg-secondary-500 text-white mr-4 hover:bg-primary-500 hover:bg-opacity-75 focus:ring-1 focus:ring-primary-50 focus:outline-none transition-colors delay-100"
                to="/login"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex w-3/12 justify-end">
              <Dropdown />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
