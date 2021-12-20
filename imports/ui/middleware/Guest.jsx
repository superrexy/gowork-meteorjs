import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

export const Guest = ({ children }) => {
  const auth = useRecoilValue(authenticated);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (auth.check) {
      navigate("/");
    }
  }, [auth.check, navigate]);
  return children;
};
