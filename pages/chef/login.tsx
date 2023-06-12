import LoginComponent from "@/components/Auth/LoginComponent";
import Head from "next/head";
import React from "react";

const Login = () => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginComponent register_link="/chef/register" />
    </div>
  );
};

export default Login;
