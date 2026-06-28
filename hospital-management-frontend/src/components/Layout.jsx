import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F4F7FE",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

     <Box
        sx={{
            flexGrow: 1,
            ml: "290px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "calc(100% - 290px)",
        }}
        >
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <Box
  component="main"
  sx={{
    flexGrow: 1,
    width: "100%",
    p: {
      xs: 2,
      md: 4,
      lg: 5,
    },
  }}
>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;