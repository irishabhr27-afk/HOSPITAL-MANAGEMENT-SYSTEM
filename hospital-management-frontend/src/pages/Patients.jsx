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

function Patients() {

  const [patients, setPatients] = useState([]);
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
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const response = await API.get("/patients");
      setPatients(response.data);
    } catch (error) {
  console.log(error.response.data);
    }
  }

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
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
      age: "",
      gender: "",
      phone: "",
      email: "",
      bloodGroup: "",
    });

  };

  const handleSubmit = async () => {

    try {

      if (editingId) {

        await API.put(
          `/patients/${editingId}`,
          formData
        );

        setSnackbar({
          open: true,
          message: "Patient updated successfully",
          severity: "success",
        });

      } else {
        console.log(formData);
        await API.post(
          "/patients",
          formData
        );

        setSnackbar({
          open: true,
          message: "Patient added successfully",
          severity: "success",
        });

      }

      fetchPatients();

      handleClose();
} catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);
  console.log("Message:", error.response?.data?.message);

  setSnackbar({
    open: true,
    message: error.response?.data?.message || "Something went wrong",
    severity: "error",
  });
}

};

const handleEdit = (patient) => {
  setEditingId(patient._id);

  setFormData({
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    phone: patient.phone,
    email: patient.email,
    bloodGroup: patient.bloodGroup,
  });

  setOpen(true);
};
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this patient?"))
      return;

    try {

      await API.delete(`/patients/${id}`);

      fetchPatients();

      setSnackbar({
        open: true,
        message: "Patient deleted successfully",
        severity: "success",
      });

    } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);
  console.log("Message:", error.response?.data?.message);

      setSnackbar({
        open: true,
        message: error.response?.data?.message ||  "Delete failed",
        severity: "error",
      });

    }

  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
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
        Patients Management
      </Typography>

      <Typography color="text.secondary">
        Manage hospital patients and their records
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
      Add Patient
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
    {editingId ? "Edit Patient" : "Add Patient"}
  </DialogTitle>

  <DialogContent>
    <Grid container spacing={2} sx={{ mt: 1 }}>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Patient Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
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
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          label="Blood Group"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        >
          <MenuItem value="">Select Blood Group</MenuItem>
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="A-">A-</MenuItem>
          <MenuItem value="B+">B+</MenuItem>
          <MenuItem value="B-">B-</MenuItem>
          <MenuItem value="AB+">AB+</MenuItem>
          <MenuItem value="AB-">AB-</MenuItem>
          <MenuItem value="O+">O+</MenuItem>
          <MenuItem value="O-">O-</MenuItem>
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
  {/* ================ Patients Table ================= */}

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
            <TableCell><b>Age</b></TableCell>
            <TableCell><b>Gender</b></TableCell>
            <TableCell><b>Blood Group</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Actions</b></TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {filteredPatients.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={6}
                align="center"
              >
                No patients found
              </TableCell>

            </TableRow>

          ) : (

            filteredPatients.map((patient) => (

              <TableRow
                hover
                key={patient._id}
              >

                <TableCell>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >

                    <Avatar
                      sx={{
                        bgcolor: "secondary.main",
                      }}
                    >
                      {patient.name?.charAt(0)}
                    </Avatar>

                    <Box>

                      <Typography
                        fontWeight={600}
                      >
                        {patient.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {patient.email || "-"}
                      </Typography>

                    </Box>

                  </Box>

                </TableCell>

                <TableCell>
                  {patient.age}
                </TableCell>

                <TableCell>

                  <Chip
                    label={patient.gender}
                    color="primary"
                    variant="outlined"
                  />

                </TableCell>

                <TableCell>
                  {patient.bloodGroup || "-"}
                </TableCell>

                <TableCell>
                  {patient.phone}
                </TableCell>

                <TableCell>

                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(patient)}
                  >
                    Edit
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() =>
                      handleDelete(patient._id)
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

export default Patients;