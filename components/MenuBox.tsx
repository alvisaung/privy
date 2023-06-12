import { Add } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import ImgSample from "@/public/imgs/dish.jpg";
import { MenuProps } from "@/pages/chef";
import StarIcon from "@mui/icons-material/Star";

interface MenuBoxProps {
  menu?: MenuProps;
  type?: string;
}

const MenuBox: FC<MenuBoxProps> = ({ menu, type }) => {
  const router = useRouter();

  const handleDetail = () => {
    if (menu) router.push(`/chef/menu/${menu.slug}`);
    else router.push(`chef/menu/create`);
  };

  return (
    <Grid
      onClick={handleDetail}
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        cursor: "pointer",
        borderRadius: 2,
      }}
    >
      {type == "create" ? (
        <>
          <Add sx={{ margin: "auto", fontSize: 100 }} />
        </>
      ) : menu ? (
        <>
          <Image src={menu.img} width={0} height={0} sizes="100vw" alt={menu.name} style={{ width: "100%", height: "auto" }} />
          <Box>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="h4">{menu.name}</Typography>
              <Box className="row">
                <StarIcon sx={{ fontSize: 22, color: "#F4B541", mr: 0.2 }} />
                <Typography variant="body2">
                  4.0 <span style={{ color: "#6F6F6F" }}>(20+)</span>
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mt: 0.4, mb: 0.2 }}>
              Serving: {menu.served ?? 0}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
              {menu.description}
            </Typography>
          </Box>
        </>
      ) : null}
    </Grid>
  );
};
export default MenuBox;
