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
} from "@mui/material";

import {
  NotificationsNone,
  Search,
} from "@mui/icons-material";

function Navbar() {
  return (
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
        {/* Left */}

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
            Welcome back, Rishabh 👋
          </Typography>

        </Box>

        {/* Right */}

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
/>

          <IconButton>

            <Badge
              badgeContent={4}
              color="error"
            >
              <NotificationsNone/>
            </Badge>

          </IconButton>

          <Avatar
            sx={{
              bgcolor:"#2563EB"
            }}
          >
            R
          </Avatar>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;