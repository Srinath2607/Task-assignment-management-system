import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import MemberDashboard from './pages/MemberDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === 'MANAGER') {
    return <ManagerDashboard />;
  } else if (user?.role === 'MEMBER') {
    return <MemberDashboard />;
  }

  return <Navigate to="/login" replace />;
};

const Unauthorized = () => (
  <div className="auth-page">
    <div className="auth-container">
      <div className="auth-header">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page</p>
      </div>
      <a href="/dashboard" className="btn btn-primary btn-block">
        Go to Dashboard
      </a>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
