import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <a href="/" className="navbar-brand">
                        <img src="/vite.svg" alt="Logo" className="navbar-logo" />
                        TaskFlow
                    </a>
                    <div className="navbar-nav">
                        <ThemeToggle />
                        <div className="nav-info">
                            <span>{user?.name}</span>
                            <span className="user-badge">{user?.role}</span>
                        </div>
                        <button onClick={handleLogout} className="btn btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
