import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Routes>

      {/* Login Route */}

      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>

      {/* Redirect Unknown Routes */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;