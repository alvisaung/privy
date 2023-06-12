import ChefApiService from "@/services/api/ChefApiService";
import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
import Head from "next/head";
import MenuCreate from "@/components/Menu/MenuCreate";
import { MenuData } from "@/services/types/menu.type";
import { MenuFormProvider } from "@/utils/Context/MenuProvider";

interface EditProps {
  menu: MenuData;
}

const edit: FC<EditProps> = ({ menu }) => {
  return (
    <div>
      <Head>
        <title>Edit Menu</title>
      </Head>
      <MenuFormProvider>
        <MenuCreate edit={true} editFormData={menu} />
      </MenuFormProvider>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext<{ slug: string }>) => {
  const { params } = context;

  const slug = params?.slug;
  let res = await ChefApiService.GetMenuDetail(slug);

  return { props: { menu: res } };
};
export default edit;
