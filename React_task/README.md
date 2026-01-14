# Employee Management System (EMS)

A modern, responsive Employee Management System designed to help HR teams efficiently manage employee records, track statuses, and visualize organizational data.

## 🚀 Project Overview

This application provides a streamlined interface for:
- **Dashboard Analytics**: Real-time overview of total employees, active/inactive statuses, and department distributions.
- **Employee Management**: Full CRUD (Create, Read, Update, Delete) functionality for employee profiles.
- **Advanced Filtering**: Search and filter employees by name, gender, and status.
- **Secure Access**: Authentication system with protected routes to safeguard sensitive data.

## 🛠 Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: React Context API
- **Icons**: [MUI Icons](https://mui.com/material-ui/material-icons/)
- **Data Persistence**: LocalStorage (Browser-based)

## 🏃 Steps to Run Locally

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd react-task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 💡 Assumptions & Design Decisions

- **Client-side Persistence**: For the scope of this task, the application uses `localStorage` to persist data. This allows for a persistent experience without requiring a backend database.
- **Initial Data**: The system is pre-populated with mock data to demonstrate functionality immediately upon first load.
- **Responsive Design**: The UI is built using Material UI's responsive grid system, ensuring a seamless experience across mobile, tablet, and desktop devices.
- **Context API vs Redux**: React Context API was chosen for state management to keep the application lightweight while efficiently handling global states like authentication and employee data.
- **Protected Routes**: Navigation is restricted; users must log in to access the Dashboard and Employee management features.
