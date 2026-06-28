import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  color,
}) {
  return (
    <Card
  sx={{
    borderRadius: 3,
    background: "#fff",
    height: "100%",
    border: "1px solid #E2E8F0",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    transition: "all .3s ease",

    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 20px 45px rgba(37,99,235,.18)",
    },
  }}
>
     <CardContent
  sx={{
    px: 2.5,
    py: 2,
    "&:last-child": {
      pb: 2,
    },
  }}
>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Left Side */}
          <Box>

            <Typography
              sx={{
                color: "#64748B",
                fontSize: 15,
                fontWeight: 600,
                mb: 1,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                color: "#94A3B8",
                fontSize: 14,
              }}
            >
              {subtitle}
            </Typography>

          </Box>

          {/* Right Side */}
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: color,
              borderRadius: 2,

              "& svg": {
                fontSize: 30,
              },
            }}
          >
            {icon}
          </Avatar>
        </Box>

        {/* Bottom Info */}

        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "#22C55E",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            ↑ +12%
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: 13,
            }}
          >
            This Month
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
}

export default DashboardCard;