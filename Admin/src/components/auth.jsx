import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct for version 4.x+

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/login" />;

    try {
        const decoded = jwtDecode(token); // ✅ use named function
        const isExpired = decoded.exp * 1000 < Date.now();
        return isExpired ? <Navigate to="/login" /> : children;
    } catch (err) {
        return <Navigate to="/login" />;
    }
};

export default RequireAuth;
