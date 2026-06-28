import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  LocalHospital,
  Person,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      navigate("/");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Invalid username or password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#EEF2FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >

      <Paper
        elevation={10}
        sx={{
          width: 430,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            background:
              "linear-gradient(135deg,#2563EB,#1D4ED8)",
            color: "#fff",
            textAlign: "center",
            py: 4,
          }}
        >

          <Avatar
            sx={{
              width: 74,
              height: 74,
              bgcolor: "#fff",
              color: "#2563EB",
              mx: "auto",
              mb: 2,
            }}
          >
            <LocalHospital sx={{ fontSize: 42 }} />
          </Avatar>

          <Typography
            variant="h4"
            fontWeight={800}
          >
            HospitalMS
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Hospital Management System
          </Typography>

        </Box>

        <Box sx={{ p: 4 }}>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
            align="center"
          >
            Administrator Login
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">

                  <IconButton
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword
                      ? <VisibilityOff />
                      : <Visibility />}
                  </IconButton>

                </InputAdornment>
              ),
            }}
          />         
          
           <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 16,
              textTransform: "none",
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
              />
            ) : (
              "Login"
            )}
          </Button>

          <Typography
            align="center"
            sx={{
              mt: 3,
              color: "text.secondary",
              fontSize: 13,
            }}
          >
            Demo Account Credentials
          </Typography>

          <Typography
            align="center"
            sx={{
              mt: 1,
              fontWeight: 600,
              color: "#2563EB",
              fontSize: 14,
            }}
          >
            Username : admin
          </Typography>

          <Typography
            align="center"
            sx={{
              fontWeight: 600,
              color: "#2563EB",
              fontSize: 14,
            }}
          >
            Password : admin123
          </Typography>

        </Box>

      </Paper>

    </Box>

  );
}

export default Login;