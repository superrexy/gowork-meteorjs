import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authenticated } from "../../store";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export const LoginAdmin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [auth, setAuth] = useRecoilState(authenticated);
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword({ email: form.email }, form.password, (error) => {
      if (error) console.log(error);
      else {
        const user = Meteor.user();
        setAuth({check: true, user});
        navigate("/admin/", {replace: true});
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
          <h2 className="text-4xl font-semibold mb-5">Admin Go-Work</h2>
          <form onSubmit={handleLogin}>
            <div className="flex w-1/6 gap-4 mb-5">
              <div className="w-3/6">
                <label htmlFor="" className="block tracking-wide text-sm">
                  E-Mail
                </label>
                <input
                  type="email"
                  className="block border rounded-xl p-1 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your E-Mail"
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
              <div className="w-3/6">
                <label htmlFor="" className="block tracking-wide text-sm">
                  Password
                </label>
                <input
                  type="password"
                  className="block border rounded-xl p-1 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Password"
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <button
                className="px-8 py-2 rounded-full inline-flex items-center bg-blue-500 text-white"
                onClick={() => handleLogin()}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
