import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/auth.service";

import { setIsAuth } from "../../app/redux/slices/authSlice";
// import NavLinks from "./NavLinks";
// import NavLinks from "./NavLinks";

import { appLinks } from "../../constants/appLinks";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navbar = () => {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const { isLoading, error, isAuth } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const response = await authService.logout();
    console.log(response);
    if (response.error === false) {
      dispatch(setIsAuth());
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-slate-700/0">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>

          <div className="ml-auto">
            <Button onClick={() => handleLogout()} variant="contained">
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <DrawerHeader />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#070B28",
            color: "#fff",
            margin: "20px",
            borderRadius: "8px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {appLinks.map((link, index) => (
            <Link key={link.lable} to={link.path}>
              <ListItem key={link.lable} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={link.lable} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
