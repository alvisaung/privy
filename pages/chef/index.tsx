import React, { FC, useContext, useEffect } from "react";

import { Avatar, Box, Button, Grid, Icon, IconButton, Stack, Typography, makeStyles } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { ModeEdit, StarHalfOutlined } from "@mui/icons-material";
import Head from "next/head";
import MenuBox from "@/components/MenuBox";
import Footer from "@/components/Footer";
import ChefApiService from "@/services/api/ChefApiService";
import { useRouter } from "next/router";
import ChefApi from "@/services/api/chef_api";
import useSwr from "swr";
import { AuthContext } from "@/utils/Context/AuthProvider";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export interface MenuProps {
  name: string;
  img: string;
  served: number;
  description: string;
  id: number;
  slug: string;
}

interface ProfileProps {
  data: MenuProps[] | [];
  error: boolean;
  isLoading: boolean;
}

const Profile: FC<ProfileProps> = () => {
  const { data: menu_list = [], error, isLoading } = useSwr<MenuProps[]>("/menu", ChefApiService.GetMenuList);

  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const chef = {
    // name: "John Doe",
    servedCount: 150,
    review: {
      count: 50,
      stars: 4.5,
    },
    // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non fringilla libero, eget rutrum libero.",
  };

  const onLogout = () => {
    ChefApiService.ChefLogOut().then((res) => res && router.push("/"));
    setUser(null);
  };
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Grid container sx={{ p: 2, flexDirection: { xs: "column", sm: "row" }, flexWrap: "nowrap" }}>
        <Grid sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
          <Avatar sx={{ width: 100, height: 100, m: { xs: "auto", sm: "unset" } }}>{user?.name && user?.name.charAt(0)}</Avatar>
        </Grid>
        <Grid item sx={{ alignItems: { xs: "center", sm: "flex-start" }, display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">{user?.name}</Typography>
          <Typography variant="h5" sx={{ mt: { xs: 0.5, sm: 1 } }} color="text.secondary">
            Total Served: {chef.servedCount}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" color="text.secondary">
              Review:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              {[...Array(Math.floor(chef.review.stars))].map((_, i) => (
                <StarIcon key={i} sx={{ color: "#ffc107" }} />
              ))}
              {chef.review.stars % 1 !== 0 && <StarHalfOutlined sx={{ color: "#ffc107" }} />}
            </Box>
            <Typography variant="h4" color="text.secondary">
              ({chef.review.count})
            </Typography>
          </Box>
          {/* <Box> */}
          <Typography variant="body1">{user?.about_me}</Typography>

          {/* </Box> */}
        </Grid>
        <Grid item sx={{ justifyContent: { xs: "center", sm: "" }, display: { xs: "flex", sm: "block" }, mt: 0.5, ml: { xs: "", sm: "auto" } }}>
          <Button onClick={() => router.push("/chef/profile/edit")} variant="contained" sx={{ m: "auto" }} startIcon={<ModeEdit />}>
            Edit
          </Button>
        </Grid>
      </Grid>
      {/* Menu Sec */}
      <Box sx={{ m: 1, ml: 2, mr: 2 }}>
        <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} sx={{ mb: 2.5 }}>
          <Typography variant="h3">Menu List</Typography>
          <Button variant="outlined" onClick={() => router.push("/chef/menu/create")}>
            Create Menu
          </Button>
        </Stack>

        {menu_list.length > 0 ? (
          <Grid container spacing={3}>
            {menu_list.map((menu) => (
              <MenuBox key={menu.id} menu={menu} />
            ))}
          </Grid>
        ) : (
          <>
            {" "}
            <Typography sx={{ color: "warning.main", mt: 4 }} textAlign={"center"}>{`Create your menu and start earning money! Let's get started and bring your culinary delights to life.`}</Typography>
          </>
        )}
        <Button variant="contained" sx={{ mt: 10 }} onClick={onLogout}>
          Log Out
        </Button>
      </Box>
    </>
  );
};

// export const getServerSideProps: GetStaticProps = async () => {
//   const menu_list = await ChefApiService.GetMenuList();

//   return {
//     props: {
//       menu_list: menu_list,
//     },
//   };
// };
export default Profile;
