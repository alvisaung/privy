import MenuCreate from "@/components/Menu/MenuCreate";
import { MenuFormProvider } from "@/utils/Context/MenuProvider";
import Head from "next/head";
import React, { FC, useContext, useEffect, useState } from "react";

const Create: FC = () => {
  return (
    <div>
      <Head>
        <title>Create Menu</title>
      </Head>
      <MenuFormProvider>
        <MenuCreate />
      </MenuFormProvider>
    </div>
  );
};

export default Create;
