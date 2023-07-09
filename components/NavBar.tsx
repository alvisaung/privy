import React, { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Popover, ListItemButton, ListItemText, Slide, Grow, InputBase, TextField, Paper, IconButton, Box, Hidden, Drawer, List, ListItem } from "@mui/material";
import HomeStyle from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import LocalStorage from "@/services/storage/LocalStorage";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "@/utils/Context/AuthProvider";
import useSwr from "swr";
import ChefApiService from "@/services/api/ChefApiService";
import Hp from "@/services/Hp";
import { BeforeAuthRoute } from "@/services/storage/data";

const NavBar = () => {
  const [loginAnchorEl, setLoginAnchorEl] = useState<HTMLElement | null>(null);
  const loginRef = useRef(null);
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { data: profile, error } = useSwr("/profile");

  const handleLoginOpen = (event: MouseEvent<HTMLElement>) => {
    setLoginAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (!router.isReady) return;
    // !Hp.containsWordFromArray(router.pathname, BeforeAuthRoute) &&
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userAuth = await LocalStorage.getUser("chef");
    setUser(userAuth);
  };

  const handleLoginClose = (event: MouseEvent<HTMLElement>) => {
    setLoginAnchorEl(null);
  };

  const openLogin = Boolean(loginAnchorEl);

  const jumpPage = (url: string) => {
    router.push(url);
  };

  const menuItemsAuth = [
    { title: "Menu", url: "/" },
    { title: "Contact Us", url: "contact-us" },
    { title: "My Account", url: "/chef/" },
    { title: "Log Out", url: "", hide: true },
  ];

  const menuItemsBeforeAuth = [
    { title: "Menu", url: "/" },
    { title: "Contact Us", url: "contact-us" },
    { title: "My Account", url: "/chef/" },
    { title: "Log Out", url: "", hide: true },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar position="static" className={HomeStyle.nav_bar} elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }} style={{ background: "white" }}>
        <Typography variant="h6" className={HomeStyle.title}>
          <Link href="/" passHref className={HomeStyle.title}>
            {/* <Image src="/imgs/logo.png" width={50} height={50} alt="Logo" /> */}
            <Typography className="neon-font" variant="h3" color={"#D24E5B"}>
              Privy
            </Typography>
          </Link>
        </Typography>
        <Box sx={{ p: "0px 4px", borderRadius: 1, display: "flex", alignItems: "center", width: "40%", backgroundColor: "#f7f8fa", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Food" inputProps={{ "aria-label": "Search food" }} />
        </Box>

        <Hidden smDown={true}>
          {user ? (
            <Box>
              {menuItemsAuth.map(
                (menu, idx) =>
                  !menu?.hide && (
                    <Button key={idx} onClick={() => jumpPage(menu.url)} className={HomeStyle.menu_item}>
                      <Typography variant="h4">{menu.title}</Typography>
                    </Button>
                  )
              )}
            </Box>
          ) : (
            <Box>
              <Button aria-haspopup="true" ref={loginRef} className={HomeStyle.menu_item} onClick={handleLoginOpen}>
                <Typography variant="h4">Login</Typography>
              </Button>
              <Button className={HomeStyle.menu_item}>
                <Typography variant="h4">Register</Typography>
              </Button>
            </Box>
          )}
        </Hidden>
        <Hidden smUp={true}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" variant="temporary" open={isDrawerOpen} onClose={handleDrawerToggle}>
            <List>
              <ListItem onClick={handleDrawerToggle} sx={{ justifyContent: "end" }} dense>
                <CloseIcon />
              </ListItem>
              {menuItemsAuth.map((item, index) => (
                <ListItem key={index}>
                  {/* <List>{item.icon}</ListItemIcon> */}
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>

        <Popover
          id="login-popover"
          open={openLogin}
          anchorEl={loginAnchorEl}
          onClose={handleLoginClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <ListItemButton divider sx={{ p: 2 }}>
            <Typography variant="h5">Login as User</Typography>
          </ListItemButton>
          <ListItemButton sx={{ p: 2 }} onClick={() => router.push("/chef/login")}>
            <Typography variant="h5">Login as Chef</Typography>
          </ListItemButton>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
