import AuthGuard from "./AuthGuard";
import React from "react";

const RootGaurd = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default RootGaurd;