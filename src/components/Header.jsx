import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../raccoomender.png";
import { AccountBox, Logout, Settings } from "@mui/icons-material";

export default function Header(props) {
  const { loggedIn, setLoggedIn } = props;
  const navigate = useNavigate();
  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickProfile = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#4B6584",
        }}
      >
        <Toolbar>
          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              sx={{
                cursor: "pointer",
              }}
              onClick={handleClickLogo}
            >
              <Grid
                container
                sx={{
                  alignItems: "center",
                }}
              >
                <Grid item>
                  <img src={logo} width={50} alt="logo"></img>
                </Grid>
                <Grid item>
                  <Typography color="#ffffff" variant="h5">
                    Raccoomender
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {loggedIn ? (
                <div>
                  <IconButton onClick={handleClickProfile}>
                    <Avatar></Avatar>
                  </IconButton>

                  <Menu
                    open={Boolean(anchorMenu)}
                    anchorEl={anchorMenu}
                    onClose={handleCloseProfileMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <AccountBox fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                  variant="filled"
                  onClick={handleClickLogin}
                >
                  Login
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
    </>
  );
}
