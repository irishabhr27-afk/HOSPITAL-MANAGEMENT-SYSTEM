import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  Add,
  Search,
} from "@mui/icons-material";

function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchPatients();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDoctors() {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPatients() {
    try {
      const res = await API.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);

    setEditingId(null);

    setFormData({
      patientName: "",
      doctorName: "",
      appointmentDate: "",
      status: "Pending",
    });

  };

  const handleSubmit = async () => {

    try {

      if (editingId) {

        await API.put(
          `/appointments/${editingId}`,
          formData
        );

      } else {

        await API.post(
          "/appointments",
          formData
        );

      }

      fetchAppointments();

      handleClose();

      setSnackbar({
        open: true,
        message: "Appointment saved successfully",
        severity: "success",
      });

    } catch {

      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });

    }

  };

  const handleEdit = (appointment) => {

    setEditingId(appointment._id);

    setFormData({
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      appointmentDate: appointment.appointmentDate.slice(0,10),
      status: appointment.status,
    });

    setOpen(true);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete appointment?"))
      return;

    try {

      await API.delete(`/appointments/${id}`);

      fetchAppointments();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredAppointments = appointments.filter((appointment)=>
    appointment.patientName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box>

  {/* ================= HEADER ================= */}

  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb={4}
  >
    <Box>
      <Typography variant="h4" fontWeight={700}>
        Appointments Management
      </Typography>

      <Typography color="text.secondary">
        Schedule and manage hospital appointments
      </Typography>
    </Box>

    <Button
      variant="contained"
      startIcon={<Add />}
      size="large"
      onClick={handleOpen}
      sx={{
        borderRadius: 3,
        px: 3,
      }}
    >
      Add Appointment
    </Button>

  </Box>

  {/* ================= SEARCH ================= */}

  <Paper
    sx={{
      p: 2,
      mb: 4,
      borderRadius: 4,
    }}
  >
   <TextField
  fullWidth
  placeholder="Search patient..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
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
  </Paper>

  {/* ================= DIALOG ================= */}

  <Dialog
    open={open}
    onClose={handleClose}
    fullWidth
    maxWidth="md"
  >

    <DialogTitle>
      {editingId ? "Edit Appointment" : "New Appointment"}
    </DialogTitle>

    <DialogContent>

      <Grid container spacing={2} mt={1}>

        {/* Patient */}

        <Grid item xs={12} md={6}>

          <TextField
            select
            fullWidth
            label="Patient"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          >

            {patients.map((patient) => (

              <MenuItem
                key={patient._id}
                value={patient.name}
              >
                {patient.name}
              </MenuItem>

            ))}

          </TextField>

        </Grid>

        {/* Doctor */}

        <Grid item xs={12} md={6}>

          <TextField
            select
            fullWidth
            label="Doctor"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
          >

            {doctors.map((doctor) => (

              <MenuItem
                key={doctor._id}
                value={doctor.name}
              >
                {doctor.name}
              </MenuItem>

            ))}

          </TextField>

        </Grid>

        {/* Date */}

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

        </Grid>

        {/* Status */}

        <Grid item xs={12} md={6}>

          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <MenuItem value="Pending">
              Pending
            </MenuItem>

            <MenuItem value="Confirmed">
              Confirmed
            </MenuItem>

            <MenuItem value="Completed">
              Completed
            </MenuItem>

            <MenuItem value="Cancelled">
              Cancelled
            </MenuItem>

          </TextField>

        </Grid>

      </Grid>

    </DialogContent>

    <DialogActions>

      <Button onClick={handleClose}>
        Cancel
      </Button>

      <Button
        variant="contained"
        onClick={handleSubmit}
      >
        {editingId ? "Update" : "Save"}
      </Button>

    </DialogActions>

  </Dialog>
    {/* ================= APPOINTMENTS TABLE ================= */}

  <Paper
    sx={{
      borderRadius: 4,
      overflow: "hidden",
    }}
  >
    <TableContainer>

      <Table>

        <TableHead>

          <TableRow sx={{ bgcolor: "#F8FAFC" }}>

            <TableCell><b>Patient</b></TableCell>
            <TableCell><b>Doctor</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {filteredAppointments.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={5}
                align="center"
              >
                No appointments found
              </TableCell>

            </TableRow>

          ) : (

            filteredAppointments.map((appointment) => (

              <TableRow
                hover
                key={appointment._id}
              >

                <TableCell>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >

                    <Avatar sx={{ bgcolor: "#2563EB" }}>
                      {appointment.patientName.charAt(0)}
                    </Avatar>

                    <Typography fontWeight={600}>
                      {appointment.patientName}
                    </Typography>

                  </Box>

                </TableCell>

                <TableCell>

                  {appointment.doctorName}

                </TableCell>

                <TableCell>

                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString()}

                </TableCell>

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
                  />

                </TableCell>

                <TableCell align="center">

                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() =>
                      handleEdit(appointment)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() =>
                      handleDelete(appointment._id)
                    }
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>

    </TableContainer>

  </Paper>

  {/* ================= SNACKBAR ================= */}

  <Snackbar
    open={snackbar.open}
    autoHideDuration={3000}
    onClose={() =>
      setSnackbar({
        ...snackbar,
        open: false,
      })
    }
  >

    <Alert
      severity={snackbar.severity}
      variant="filled"
    >
      {snackbar.message}
    </Alert>

  </Snackbar>

</Box>

  );
}

export default Appointments;
