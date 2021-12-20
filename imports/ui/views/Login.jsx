import React from "react";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useRecoilState } from "recoil";
import { authenticated } from "../store/index";

export const Login = () => {
  let navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authenticated);

  const handleLogin = () => {
    Meteor.loginWithGoogle({}, (error) => {
      if (error) console.log(error);
      else {
        const user = Meteor.user();
        setAuth({check: true, user});
        navigate("/", {replace: true});
      }
    });
  };

  return (
    <section>
      <div className="flex h-screen">
        <div className="w-1/2 bg-gradient-to-b to-secondary-900 from-blue-700 flex justify-center items-center">
          <img
            src="/img/person-ilus.png"
            className="object-cover w-[400px] h-[400px] rounded-3xl drop-shadow-2xl"
          />
        </div>
        <div className="w-1/2 px-12 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold mb-5">Go-Work</h2>
          <h3 className="text-2xl font-semibold tracking-wide mb-3">
            Log In to continue
          </h3>
          <p className="leading-7 text-sm mb-3">
            Please log in using that account has <br /> registered on the
            website
          </p>
          <div>
            <button
              className="px-8 py-2 border rounded-full inline-flex items-center"
              onClick={() => handleLogin()}
            >
              <img src="/img/ic_google.svg" alt="" className="mr-3" /> Sign In
              with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
