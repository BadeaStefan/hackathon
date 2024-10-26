import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
export default function NavBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('userInfo');
    const userInfo = jwtDecode(token);
    const isAdmin = userInfo.isAdmin;
    function logout() {
        localStorage.removeItem('userInfo');
        navigate("/login")
    }

    return (
        <div className="navbar">
            <h1>Party</h1>
            {isAdmin && (<Link to="/admin" className="link">Admin page</Link>)}
            <button onClick={logout}>Logout</button>
        </div>
    );
}