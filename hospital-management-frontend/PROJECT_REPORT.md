# Hospital Management System - Project Report

## 1. Introduction

The Hospital Management System is a web-based application designed to simplify hospital administration activities such as managing doctors, patients, and appointments. The project provides an organized interface for hospital staff to view important statistics, maintain records, and schedule appointments.

## 2. Objective

The main objective of this project is to create a clean and user-friendly hospital management web application that can:

- Maintain doctor records
- Maintain patient records
- Schedule and manage appointments
- Display dashboard statistics
- Improve accessibility of hospital data through a web interface

## 3. Technology Used

Frontend technologies:

- React
- Vite
- Material UI
- Axios
- Recharts
- React Router

Backend technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose

## 4. Modules

### Dashboard Module

The dashboard displays important hospital statistics such as total doctors, total patients, today's appointments, and pending appointments. It also includes recent doctors, recent appointments, quick action buttons, and a weekly analytics chart.

### Doctors Module

The doctors module allows users to add, view, update, delete, and search doctor records. Each doctor record includes details such as name, specialization, phone, email, experience, and availability.

### Patients Module

The patients module allows users to add, view, update, delete, and search patient records. Each patient record includes details such as name, age, gender, phone, email, and blood group.

### Appointments Module

The appointments module allows users to create and manage appointments. Appointments include patient name, doctor name, appointment date, and status such as Pending, Confirmed, Completed, or Cancelled.

## 5. System Workflow

1. The user opens the dashboard.
2. The dashboard fetches doctors, patients, and appointment records from the backend API.
3. The user can navigate to doctors, patients, or appointments from the sidebar or quick action buttons.
4. The user can perform CRUD operations on each module.
5. Updated data is reflected in tables and dashboard statistics.

## 6. API Integration

The frontend connects to the backend using Axios. The API base URL is configured in:

```text
src/services/api.js
```

The configured backend URL is:

```text
http://localhost:5000/api
```

## 7. Testing

The project was checked using the following commands:

```bash
npm run lint
npm run build
```

Both checks completed successfully. Manual testing should include adding, editing, deleting, and viewing records in all main modules.

## 8. Advantages

- Simple and clean user interface
- Easy record management
- Dashboard-based overview
- Modular React component structure
- API-based data handling
- Useful for internship and academic demonstration

## 9. Limitations

- Authentication is not included yet
- Advanced reports are not included yet
- The chart currently shows static weekly trend data
- Deployment configuration can be added later

## 10. Future Scope

- Add admin login and role-based access
- Add billing and invoice management
- Add downloadable reports
- Add appointment reminders
- Add advanced filters and export options
- Deploy frontend and backend online

## 11. Conclusion

The Hospital Management System provides a practical web-based solution for managing doctors, patients, and appointments. It demonstrates full-stack application development concepts including frontend design, API integration, CRUD operations, reusable components, and dashboard analytics.
