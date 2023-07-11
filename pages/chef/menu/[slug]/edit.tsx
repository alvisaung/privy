import ChefApiService from "@/services/api/ChefApiService";
import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import MenuCreate from "@/components/Menu/MenuCreate";
import { MenuData } from "@/services/types/menu.type";
import { MenuFormProvider } from "@/utils/Context/MenuProvider";
import { useRouter } from "next/router";

interface EditProps {
  menu: MenuData;
}

const Edit: FC<EditProps> = () => {
  const [menu, setMenu] = useState<MenuData | undefined>(undefined);

  useEffect(() => {
    onStart();
  }, []);

  const router = useRouter();

  const onStart = async () => {
    const { slug } = router.query;

    let res = await ChefApiService.GetMenuDetail(slug);
    setMenu(res);
  };
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

export default Edit;
