import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

export const Authenticated = ({ children, roles }) => {
  const auth = useRecoilValue(authenticated);
  
  const userRole = auth?.user?.profile?.role && roles.includes(auth?.user?.profile?.role) ? true : false;

  console.log(roles.includes(auth?.user?.profile?.role));

  if (!auth.check) {
    return <Navigate to="/" />;
  }

  if (auth.check && !userRole) {
    return <Navigate to="/" />;
  }

  return children;
};
