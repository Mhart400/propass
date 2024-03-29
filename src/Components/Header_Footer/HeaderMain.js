import * as React from "react";
import { AppBar, Badge } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CustomLink from "./CustomLink";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../userProfile/UserAvatar";
import { ToggleDarkMode } from "../ToggleDarkMode";
import logoLight from "../../Images/logo_white copy.png";
import logoDark from "../../Images/logo_dark.png";
import { useTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "../Cart/CartModal";

const pages = {
  none: [],
  owner: [
    { pageName: "Dashboard", pageLink: "/owner/dashboard" },
    { pageName: "My Profile", pageLink: "/owner/profile" },
    { pageName: "Bookings", pageLink: "/owner/bookings" },
    { pageName: "Messages", pageLink: "/owner/messages" },
  ],
  pro: [
    { pageName: "Dashboard", pageLink: "/pro/dashboard" },
    { pageName: "My Profile", pageLink: "/pro/profile" },
    { pageName: "Bookings", pageLink: "/pro/bookings" },
    { pageName: "Messages", pageLink: "/pro/messages" },
  ],
};
const settings = [<ToggleDarkMode />, "Logout"];

const HeaderMain = () => {
  //AUTH & required variables
  const { currentUser, logout, userProfile } = useAuth();
  const { cartItems } = useCart();
  const theme = useTheme();
  let userRole = "none";
  try {
    if ((userProfile === null) | (userProfile === undefined)) {
      userRole = "none";
    } else if (userProfile["isOwner"] && userProfile["isOwner"] === true) {
      userRole = "owner";
    } else {
      userRole = "pro";
    }
  } catch (error) {
    console.log(error);
  }

  const [cartVisible, setCartVisible] = React.useState(false)
  React.useEffect(() => {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      setCartVisible(true)
    } else {
      setCartVisible(false)
    }
  }, [cartItems])
  
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [cartModalOpen, setCartModalOpen] = React.useState(false);
  const openCartModal = () => {
    setCartModalOpen(true);
  };
  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        color: "header.primary",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={theme.palette.mode === "light" ? logoLight : logoDark}
            sx={{ height: "60px" }}
            onClick={() => navigate("/")}
          />
          {/* // Hamburger Menu and Menu Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {currentUser && (
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {currentUser &&
                    pages[userRole].map((page) => (
                      <MenuItem
                        key={page.pageName}
                        onClick={() => {
                          handleCloseNavMenu();
                          navigate(page.pageLink);
                        }}
                      >
                        <Typography textAlign="center">
                          {page.pageName}
                        </Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            )}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userProfile &&
              pages[userRole].map((page) => (
                <Box sx={{ marginX: "30px" }} key={`${Math.random()}${page.pageName}`}>
                  <CustomLink
                    key={page.pageName}
                    to={page.pageLink}
                    activeStyle={{ fontWeight: "bold", textDecoration: "underline", }}
                    inactiveStyle={{ textDecoration: "none" }}
                  >
                    {page.pageName}
                  </CustomLink>
                </Box>
              ))}
          </Box>

          {userProfile && (
            <>
              {cartVisible && cartItems && cartItems.length > 0 && (
                <IconButton onClick={openCartModal} sx={{ mx: 1 }}>
                  <Badge
                    badgeContent={cartItems.length}
                    
                    sx={{'& .MuiBadge-badge': {fontSize: '12px', color: 'white', backgroundColor: 'secondary.main'}}}
                    >
                    <ShoppingCartIcon sx={{ color: "primary.dark" }} />
                  </Badge>
                </IconButton>
              )}
              {cartModalOpen && (
                <CartModal open={cartModalOpen} closeModal={closeCartModal} />
              )}

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <UserAvatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseNavMenu();
                        if (setting === "Logout") {
                          logout();
                          navigate("/");
                        }
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
          {!currentUser && (
            <Box >
              <Button
                variant="outlined"
                sx={{ color: "primary", outline: "1px solid white" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderMain;
