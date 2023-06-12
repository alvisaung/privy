import RegisterComponent from "@/components/Auth/RegisterComponent";
import React from "react";

const register = () => {
  return (
    <div>
      <RegisterComponent login_link="/chef/login" />
    </div>
  );
};

export default register;
