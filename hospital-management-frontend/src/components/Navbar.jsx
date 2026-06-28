import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Badge,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import {
  NotificationsNone,
  Search,
  Person,
  Info,
  HelpOutline,
  Logout,
} from "@mui/icons-material";

function Navbar() {
const navigate = useNavigate();

const admin =
  JSON.parse(localStorage.getItem("admin")) || {
    username: "Administrator",
  };

const [profileOpen, setProfileOpen] = useState(false);

  // ===================== STATES =====================

  const [search, setSearch] = useState("");

  const [profileAnchor, setProfileAnchor] = useState(null);

  const [notificationAnchor, setNotificationAnchor] =
    useState(null);

  const [aboutOpen, setAboutOpen] = useState(false);

  const [helpOpen, setHelpOpen] = useState(false);

  // ===================== HANDLERS =====================

  const handleProfileOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseMenus = () => {
    setProfileAnchor(null);
    setNotificationAnchor(null);
  };

  return (
    <>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          color: "#111827",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >

          {/* LEFT SIDE */}

          <Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              Hospital Dashboard
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
              }}
            >
              Welcome back, {admin.username} 👋
            </Typography>

          </Box>

          {/* RIGHT SIDE */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >

            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              sx={{
                width: 280,
                bgcolor: "#F8FAFC",
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />            <IconButton onClick={handleNotificationOpen}>
              <Badge
                badgeContent={4}
                color="error"
              >
                <NotificationsNone />
              </Badge>
            </IconButton>

            <Avatar
              onClick={handleProfileOpen}
              sx={{
                bgcolor: "#2563EB",
                cursor: "pointer",
                transition: "0.25s",

                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              R
            </Avatar>

          </Box>

        </Toolbar>
      </AppBar>

      {/* ===================== NOTIFICATION MENU ===================== */}

      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleCloseMenus}
        PaperProps={{
          sx: {
            width: 340,
            borderRadius: 3,
          },
        }}
      >

        <Typography
          sx={{
            px: 2,
            py: 1,
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          Notifications
        </Typography>

        <Divider />

        <List dense>

          <ListItem>
            <ListItemText
              primary="🟢 New patient registered"
              secondary="2 minutes ago"
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🟡 Appointment pending"
              secondary="15 minutes ago"
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🔵 Doctor added successfully"
              secondary="Today"
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🟣 Dashboard running normally"
              secondary="System Status"
            />
          </ListItem>

        </List>

      </Menu>

      {/* ===================== PROFILE MENU ===================== */}

      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={handleCloseMenus}
        PaperProps={{
          sx: {
            width: 220,
            borderRadius: 3,
          },
        }}
      >

       <MenuItem
  onClick={() => {
    setProfileOpen(true);
    handleCloseMenus();
  }}
>
  <Person sx={{ mr: 2 }} />
  My Profile
</MenuItem>

        <MenuItem
          onClick={() => {
            setAboutOpen(true);
            handleCloseMenus();
          }}
        >
          <Info sx={{ mr: 2 }} />
          About
        </MenuItem>

        <MenuItem
          onClick={() => {
            setHelpOpen(true);
            handleCloseMenus();
          }}
        >
          <HelpOutline sx={{ mr: 2 }} />
          Help & Support
        </MenuItem>

        <Divider />

        <MenuItem
  onClick={() => {
    handleCloseMenus();

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/login", { replace: true });
  }}
>
  <Logout sx={{ mr: 2 }} />
  Logout
</MenuItem>
      </Menu>      {/* ===================== ABOUT DIALOG ===================== */}

      <Dialog
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          About Hospital Management System
        </DialogTitle>

        <DialogContent dividers>

          <Typography variant="h6" fontWeight={700} gutterBottom>
            Hospital Management System
          </Typography>

          <Typography paragraph>
            A modern Hospital Management System developed to efficiently
            manage doctors, patients and appointments through an intuitive
            dashboard.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography><strong>Version:</strong> 1.0</Typography>

          <Typography><strong>Developed By:</strong> Rishabh Raj</Typography>

          <Typography><strong>Frontend:</strong> React + Material UI</Typography>

          <Typography><strong>Backend:</strong> Node.js + Express.js</Typography>

          <Typography><strong>Database:</strong> MongoDB</Typography>

          <Typography><strong>Year:</strong> 2026</Typography>

        </DialogContent>

        <DialogActions>

          <Button
            variant="contained"
            onClick={() => setAboutOpen(false)}
          >
            Close
          </Button>

        </DialogActions>

      </Dialog>

      {/* ===================== HELP & SUPPORT ===================== */}

      <Dialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Help & Support
        </DialogTitle>

        <DialogContent dividers>

          <Typography paragraph>
            If you need assistance while using the Hospital Management
            System, you can contact the administrator.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography gutterBottom>
            📧 <strong>Email:</strong> support@hospitalms.com
          </Typography>

          <Typography gutterBottom>
            📞 <strong>Phone:</strong> +91 9876543210
          </Typography>

          <Typography gutterBottom>
            🕒 <strong>Working Hours:</strong> Monday – Saturday
          </Typography>

          <Typography gutterBottom>
            ⏰ 9:00 AM – 6:00 PM
          </Typography>

        </DialogContent>

        <DialogActions>

          <Button
            variant="contained"
            onClick={() => setHelpOpen(false)}
          >
            Close
          </Button>

        </DialogActions>
      </Dialog>
      
{/* ===================== PROFILE DIALOG ===================== */}

<Dialog
  open={profileOpen}
  onClose={() => setProfileOpen(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle>My Profile</DialogTitle>

  <DialogContent dividers>

    <Typography gutterBottom>
      <strong>Username:</strong> {admin.username}
    </Typography>

    <Typography gutterBottom>
      <strong>Role:</strong> Administrator
    </Typography>

    <Typography gutterBottom>
      <strong>Status:</strong> Active
    </Typography>

  </DialogContent>

  <DialogActions>
    <Button
      variant="contained"
      onClick={() => setProfileOpen(false)}
    >
      Close
    </Button>
  </DialogActions>

</Dialog>
  </>

);
}

export default Navbar;