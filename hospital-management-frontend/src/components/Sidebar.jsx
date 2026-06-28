import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";

import {
  Dashboard,
  LocalHospital,
  People,
  EventNote,
} from "@mui/icons-material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { NavLink } from "react-router-dom";

const drawerWidth = 290;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
  {
    text: "Doctors",
    icon: <LocalHospital />,
    path: "/doctors",
  },
  {
    text: "Patients",
    icon: <People />,
    path: "/patients",
  },
  {
    text: "Appointments",
    icon: <EventNote />,
    path: "/appointments",
  },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#0F172A",
          color: "#fff",
          border: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        {/* ================= LOGO ================= */}

        <Box
          sx={{
            py: 4,
            px: 3,
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
         <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1.5,
  }}
>
            <LocalHospitalIcon
              sx={{
                fontSize: 36,
                color: "#3B82F6",
              }}
            />

            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: 0.5,
              }}
            >
              HospitalMS
            </Typography>
          </Box>

          <Typography
            align="center"
            sx={{
              mt: 1,
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        {/* ================= MENU ================= */}

        <List
          sx={{
            mt: 5,
            px: 1.5,
          }}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.text}
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    mb: 1.5,
                    px: 2.5,
                    py: 1.5,

                    borderRadius: 4,

                    borderLeft: isActive
                      ? "4px solid #60A5FA"
                      : "4px solid transparent",

                    bgcolor: isActive
                      ? "#2563EB"
                      : "transparent",

                    boxShadow: isActive
                      ? "0 12px 30px rgba(37,99,235,.35)"
                      : "none",

                    transition: "all .25s ease",

                    "&:hover": {
                      bgcolor: "#1E40AF",
                      transform: "translateX(6px)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#fff",
                      minWidth: 54,

                      "& svg": {
                        fontSize: 24,
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: 0.3,
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>
      </Box>

      {/* ================= PROFILE ================= */}

      <Box
        sx={{
          p: 3,
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,

            p: 2,

            borderRadius: 4,

            background: "rgba(255,255,255,.05)",

            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <Avatar
            sx={{
              width: 52,
              height: 52,
              bgcolor: "#2563EB",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            R
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Rishabh
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#94A3B8",
              }}
            >
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;