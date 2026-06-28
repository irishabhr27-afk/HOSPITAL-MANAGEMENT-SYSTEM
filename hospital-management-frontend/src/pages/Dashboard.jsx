import { useEffect, useState } from "react";

import {
  Grid,
  Paper,
  Box,
  Typography,
  Avatar,
  Stack,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
} from "@mui/material";

import {
  LocalHospital,
  People,
  EventNote,
  PendingActions,
  ArrowForward,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import DashboardCard from "../components/DashboardCard";
import AppointmentChart from "../components/AppointmentChart";
function Dashboard() {

  const navigate = useNavigate();

  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);
  const [pendingAppointmentCount, setPendingAppointmentCount] = useState(0);

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get("/doctors"),
      API.get("/patients"),
      API.get("/appointments"),
    ])
      .then(([doctorsResponse, patientsResponse, appointmentsResponse]) => {
        const doctorData = doctorsResponse.data;
        const patientData = patientsResponse.data;
        const appointmentData = appointmentsResponse.data;
        const today = new Date();

        setDoctors(doctorData);
        setDoctorCount(doctorData.length);
        setPatientCount(patientData.length);
        setAppointments(appointmentData);
        setTodayAppointmentCount(
          appointmentData.filter((appointment) => {
            const appointmentDate = new Date(appointment.appointmentDate);

            return appointmentDate.toDateString() === today.toDateString();
          }).length
        );
        setPendingAppointmentCount(
          appointmentData.filter((appointment) => appointment.status === "Pending").length
        );
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

 return (

<Box sx={{ width: "100%" }}>

 {/* ================= HEADER ================= */}

<Paper
 sx={{
  py: 2.5,
  px: 4,
  borderRadius: 3,
  border: "1px solid #E2E8F0",
  bgcolor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(15,23,42,.05)",
  display: "flex",
  flexDirection: "column",

  "&:hover": {
    boxShadow: "0 12px 30px rgba(15,23,42,.10)",
  },
}}
>
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
  >
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        color="#0F172A"
      >
        Hospital Dashboard
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "#64748B",
          fontSize: 16,
        }}
      >
        Welcome back, Rishabh 👋
      </Typography>
    </Box>

    <Paper
      sx={{
  px: 3,
py: 2,
  borderRadius: 3,
  border: "1px solid #E2E8F0",
  bgcolor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(15,23,42,.05)",
  transition: "all .25s ease",

  "&:hover": {
    boxShadow: "0 12px 30px rgba(15,23,42,.10)",
  },
}}
    >
      <Typography
  sx={{
    fontWeight: 700,
    textAlign: "center",
  }}
>
        {new Date().toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Typography>

      <Typography
  sx={{
    textAlign: "center",
    color: "text.secondary",
    fontSize: 13,
  }}
>
      
        Live Dashboard
      </Typography>
    </Paper>
  </Stack>

</Paper>




{/* ================= STATISTICS ================= */}

<Grid
  container
  spacing={3}
  mb={5}
  alignItems="stretch"
>

  <Grid item xs={12} sm={6} md={6} lg={3}>
    <DashboardCard
      title="Doctors"
      value={doctorCount}
      subtitle="Registered Doctors"
      color="#2563EB"
      icon={<LocalHospital />}
    />
  </Grid>

  <Grid item xs={12} sm={6} md={6} lg={3}>
    <DashboardCard
      title="Patients"
      value={patientCount}
      subtitle="Registered Patients"
      color="#10B981"
      icon={<People />}
    />
  </Grid>

  <Grid item xs={12} sm={6} md={6} lg={3}>
    <DashboardCard
      title="Appointments"
      value={todayAppointmentCount}
      subtitle="Today's Appointments"
      color="#F59E0B"
      icon={<EventNote />}
    />
  </Grid>

  <Grid item xs={12} sm={6} md={6} lg={3}>
    <DashboardCard
      title="Pending"
      value={pendingAppointmentCount}
      subtitle="Pending Appointments"
      color="#7C3AED"
      icon={<PendingActions />}
    />
  </Grid>

</Grid>
{/* ================= ANALYTICS ================= */}

<Grid
  container
  spacing={3}
  mb={6}
  alignItems="stretch"
>

  {/* Left Side - Chart */}

  <Grid item xs={12} lg={9}>

    <Paper
     sx={{
  py: 3,
  px: 4,
  borderRadius: 3,
  border: "1px solid #E2E8F0",
  bgcolor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(15,23,42,.05)",
  transition: "all .25s ease",

  "&:hover": {
    boxShadow: "0 12px 30px rgba(15,23,42,.10)",
  },
}}
    >

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Box>

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Weekly Analytics
          </Typography>

          <Typography
            color="text.secondary"
            fontSize={14}
          >
            Appointment trends this week
          </Typography>

        </Box>

        <Chip
          label="Live"
          color="success"
          size="small"
        />

      </Stack>

      <AppointmentChart />

    </Paper>

  </Grid>

  {/* Right Side */}

<Grid item xs={12} lg={3}>

    <Paper
      sx={{
  py: 3,
  px: 4,
  borderRadius: 3,
  border: "1px solid #E2E8F0",
  bgcolor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(15,23,42,.05)",
  transition: "all .25s ease",

  "&:hover": {
    boxShadow: "0 12px 30px rgba(15,23,42,.10)",
  },
}}
>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        >
        Quick Actions
      </Typography>

      <Stack spacing={2.5}>

        <Button
          fullWidth
          variant="contained"
          startIcon={<LocalHospital />}
          onClick={() => navigate("/doctors")}
          sx={{
            py: 2,
            borderRadius: 3,
            justifyContent: "flex-start",
          }}
        >
          Manage Doctors
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="success"
          startIcon={<People />}
          onClick={() => navigate("/patients")}
          sx={{
            py: 2,
            borderRadius: 3,
            justifyContent: "flex-start",
          }}
        >
          Manage Patients
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="warning"
          startIcon={<EventNote />}
          onClick={() => navigate("/appointments")}
          sx={{
            py: 2,
            borderRadius: 3,
            justifyContent: "flex-start",
          }}
        >
          Manage Appointments
        </Button>

      </Stack>

      <Box
        mt={4}
        sx={{
          p: 3,
          bgcolor: "#F8FAFC",
          borderRadius: 3,
        }}
      >

        <Typography
          fontWeight={700}
        >
          Today's Summary
        </Typography>

        <Typography
          mt={2}
          color="text.secondary"
        >
          Doctors : {doctorCount}
        </Typography>

        <Typography
          color="text.secondary"
        >
          Patients : {patientCount}
        </Typography>

        <Typography
          color="text.secondary"
        >
          Today's Appointments : {todayAppointmentCount}
        </Typography>

      </Box>

    </Paper>

  </Grid>

</Grid>
{/* ================= RECENT DATA ================= */}

<Grid container spacing={4}>

  {/* ================= RECENT DOCTORS ================= */}

  <Grid item xs={12} lg={6}>

  <Paper
  sx={{
    px: 5,
py: 3,
    borderRadius: 3,
    border: "1px solid #E2E8F0",
    bgcolor: "#FFFFFF",
    boxShadow: "0 8px 24px rgba(15,23,42,.05)",
    transition: "all .25s ease",

    "&:hover": {
      boxShadow: "0 12px 30px rgba(15,23,42,.10)",
    },
  }}
>

<Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  mb={3}
>

        <Typography variant="h5" fontWeight={700}>
          Recent Doctors
        </Typography>

        <Button
          endIcon={<ArrowForward />}
          onClick={() => navigate("/doctors")}
        >
          View All
        </Button>

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell sx={{ fontWeight: 700 }}>Doctor</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Specialization
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Phone
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {doctors.length === 0 ? (

              <TableRow>

                <TableCell colSpan={3} align="center">

                  <Typography color="text.secondary">

                    No doctors found.

                  </Typography>

                </TableCell>

              </TableRow>

            ) : (

              doctors.slice(0,5).map((doctor)=>(

                <TableRow hover key={doctor._id}>

                  <TableCell>

                   <Stack
  direction="row"
  alignItems="center"
  spacing={2}
>

                      <Avatar
                        sx={{
                          bgcolor:"#2563EB",
                          width:44,
                          height:44,
                        }}
                      >
                        {doctor.name.charAt(0)}
                      </Avatar>

                      <Typography
  fontWeight={600}
  fontSize={15}
>
                        {doctor.name}
                      </Typography>

                    </Stack>

                  </TableCell>

                  <TableCell>

                    <Chip
                      label={doctor.specialization}
                      color="primary"
                      variant="outlined"
                    />

                  </TableCell>

                  <TableCell>
                    {doctor.phone}
                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  </Grid>

  {/* ================= RECENT APPOINTMENTS ================= */}

  <Grid item xs={12} lg={6}>

   <Paper
  sx={{
   px: 5,
py: 3,
    borderRadius: 3,
    border: "1px solid #E2E8F0",
    bgcolor: "#FFFFFF",
    boxShadow: "0 8px 24px rgba(15,23,42,.05)",
    transition: "all .25s ease",

    "&:hover": {
      boxShadow: "0 12px 30px rgba(15,23,42,.10)",
    },
  }}
>

<Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  mb={3}
>

        <Typography variant="h5" fontWeight={700}>
          Recent Appointments
        </Typography>

        <Button
          endIcon={<ArrowForward />}
          onClick={() => navigate("/appointments")}
        >
          View All
        </Button>

      </Stack>

      <TableContainer>

       <Table
  sx={{
    "& .MuiTableCell-root": {
      py: 2,
    },
  }}
>
  <TableHead
    sx={{
      "& .MuiTableCell-root": {
        fontWeight: 700,
        color: "#475569",
        borderBottom: "2px solid #E2E8F0",
        fontSize: 14,
      },
    }}
  >
    <TableRow>
      <TableCell>Patient</TableCell>
      <TableCell>Doctor</TableCell>
      <TableCell>Status</TableCell>
    </TableRow>
  </TableHead>

  <TableBody>
    {appointments.length === 0 ? (
      <TableRow>
        <TableCell colSpan={3} align="center">
          <Typography color="text.secondary">
            No appointments found.
          </Typography>
        </TableCell>
      </TableRow>
    ) : (
      appointments.slice(0, 5).map((appointment) => (
        <TableRow
          key={appointment._id}
          hover
          sx={{
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          <TableCell>{appointment.patientName}</TableCell>

          <TableCell>{appointment.doctorName}</TableCell>

          <TableCell>
            <Chip
              label={appointment.status}
              color={
                appointment.status === "Completed"
                  ? "success"
                  : appointment.status === "Confirmed"
                  ? "primary"
                  : appointment.status === "Cancelled"
                  ? "error"
                  : "warning"
              }
              size="small"
            />
          </TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>

      </TableContainer>

    </Paper>

 </Grid>

</Grid>

</Box>
);
}
export default Dashboard;
