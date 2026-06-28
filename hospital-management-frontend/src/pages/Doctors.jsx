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
function Doctors() {

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    experience: "",
    availability: "Available",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);  
    }
  }
if(loading){
    return (
      <Box>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
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
      name: "",
      specialization: "",
      phone: "",
      email: "",
      experience: "",
      availability: "Available",
    });

  };

  const handleSubmit = async () => {

    try {

      if (editingId) {

        await API.put(
          `/doctors/${editingId}`,
          formData
        );

        setSnackbar({
          open: true,
          message: "Doctor updated successfully",
          severity: "success",
        });

      } else {

        await API.post(
          "/doctors",
          formData
        );

        setSnackbar({
          open: true,
          message: "Doctor added successfully",
          severity: "success",
        });

      }

      fetchDoctors();

      handleClose();

    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });

    }

  };

  const handleEdit = (doctor) => {

    setEditingId(doctor._id);

    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email,
      experience: doctor.experience,
      availability: doctor.availability,
    });

    setOpen(true);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this doctor?"))
      return;

    try {

      await API.delete(`/doctors/${id}`);

      fetchDoctors();

      setSnackbar({
        open: true,
        message: "Doctor deleted",
        severity: "success",
      });

    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Delete failed",
        severity: "error",
      });

    }

  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name
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
        Doctors Management
      </Typography>

      <Typography color="text.secondary">
        Manage hospital doctors and their information
      </Typography>

    </Box>

    <Button
      variant="contained"
      size="large"
      startIcon={<Add />}
      onClick={handleOpen}
      sx={{
        borderRadius: 3,
        px: 3,
      }}
    >
      Add Doctor
    </Button>

  </Box>

  {/* ================= SEARCH ================= */}

  <Paper
    sx={{
      p: 2,
      borderRadius: 4,
      mb: 4,
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
    maxWidth="md"
    fullWidth
  >

    <DialogTitle>

      {editingId
        ? "Edit Doctor"
        : "Add Doctor"}

    </DialogTitle>

    <DialogContent>

      <Grid
        container
        spacing={2}
        mt={1}
      >

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            label="Doctor Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            type="number"
            label="Experience (Years)"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            select
            fullWidth
            label="Availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >

            <MenuItem value="Available">
              Available
            </MenuItem>

            <MenuItem value="Busy">
              Busy
            </MenuItem>

            <MenuItem value="On Leave">
              On Leave
            </MenuItem>

          </TextField>

        </Grid>

      </Grid>

    </DialogContent>

    <DialogActions>

      <Button
        onClick={handleClose}
      >
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
    {/* ================= Doctors Table ================= */}

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

            <TableCell><b>Doctor</b></TableCell>
            <TableCell><b>Specialization</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Experience</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {filteredDoctors.length === 0 ? (

            <TableRow>

              <TableCell colSpan={6} align="center">
                No doctors found
              </TableCell>

            </TableRow>

          ) : (

            filteredDoctors.map((doctor) => (

              <TableRow hover key={doctor._id}>

                <TableCell>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >

                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {doctor.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>

                      <Typography fontWeight={600}>
                        {doctor.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {doctor.phone}
                      </Typography>

                    </Box>

                  </Box>

                </TableCell>

                <TableCell>

                  <Chip
                    label={doctor.specialization}
                    color="primary"
                    variant="outlined"
                  />

                </TableCell>

                <TableCell>
                  {doctor.email}
                </TableCell>

                <TableCell>
                  {doctor.experience} Years
                </TableCell>

                <TableCell>

                  <Chip
                    label={doctor.availability}
                    color={
                      doctor.availability === "Available"
                        ? "success"
                        : doctor.availability === "Busy"
                        ? "warning"
                        : "error"
                    }
                  />

                </TableCell>

                <TableCell align="center">

                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(doctor)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() =>
                      handleDelete(doctor._id)
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

  {/* ================= Snackbar ================= */}

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

export default Doctors;
