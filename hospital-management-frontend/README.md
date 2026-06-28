# Hospital Management System

A full-stack Hospital Management System frontend built with React, Vite, and Material UI. The application helps manage doctors, patients, and appointments through a clean dashboard and CRUD-based management screens.

## Features

- Dashboard with live hospital statistics
- Doctors management with add, edit, delete, search, and status display
- Patients management with add, edit, delete, search, and patient details
- Appointments management with patient/doctor selection, date, status update, and delete
- Recent doctors and recent appointments tables
- Weekly appointment analytics chart
- Responsive Material UI layout with sidebar and navbar
- Reusable Axios API service

## Tech Stack

- React
- Vite
- Material UI
- Axios
- Recharts
- React Router
- Node.js and Express.js backend API
- MongoDB with Mongoose

## API Endpoints

The frontend expects the backend API to run at:

```text
http://localhost:5000/api
```

Required endpoints:

```text
GET    /api/doctors
POST   /api/doctors
PUT    /api/doctors/:id
DELETE /api/doctors/:id

GET    /api/patients
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id

GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
```

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    AppointmentChart.jsx
    DashboardCard.jsx
    Layout.jsx
    Navbar.jsx
    Sidebar.jsx
  pages/
    Appointments.jsx
    Dashboard.jsx
    Doctors.jsx
    Patients.jsx
  services/
    api.js
  theme/
    theme.js
```

## Backend Data Models

Expected doctor fields:

```text
name, specialization, phone
```

Expected patient fields:

```text
name, age, gender, phone
```

Expected appointment fields:

```text
patientName, doctorName, appointmentDate, status
```

Default appointment status:

```text
Pending
```

## Demo Flow

1. Open the dashboard.
2. Add sample doctors.
3. Add sample patients.
4. Create appointments using the added doctors and patients.
5. Edit one doctor, one patient, and one appointment.
6. Delete a test record.
7. Return to the dashboard and verify the statistics update.

## Current Verification

The frontend has been checked with:

```bash
npm run lint
npm run build
```

Both commands complete successfully.

## Future Enhancements

- Authentication and role-based access
- Report generation
- Appointment reminders
- Billing module
- Advanced search and filters
- Export to PDF or Excel
