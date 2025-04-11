import useAuth from "@/hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 250;
const NAVIGATION_ITEMS = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
] as const;

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  position: "static",
  "& .MuiToolbar-root": {
    justifyContent: "space-between",
  },
}));

const StyledDrawer = styled(Box)(() => ({
  width: DRAWER_WIDTH,
  padding: 16,
}));

interface NavigationItemProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  text,
  icon,
  onClick,
}) => (
  <ListItem disablePadding>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

const DashboardHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleDrawerToggle();
  };

  const handleLogout = () => {
    logout();
    handleDrawerToggle();
  };

  return (
    <>
      <StyledAppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledDrawer role="presentation">
          <List>
            {NAVIGATION_ITEMS.map(({ text, icon, path }) => (
              <NavigationItem
                key={text}
                text={text}
                icon={icon}
                onClick={() => handleNavigation(path)}
              />
            ))}
            <NavigationItem
              text="Logout"
              icon={<LogoutIcon />}
              onClick={handleLogout}
            />
          </List>
        </StyledDrawer>
      </Drawer>
    </>
  );
};

export default DashboardHeader;
