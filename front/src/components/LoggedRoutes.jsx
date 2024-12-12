import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
    const auth = JSON.parse(localStorage.getItem('auth') || '{"token": false}');

    if (auth.token) {
        return auth.token ? <Navigate to="/" /> : <Outlet />;
    }
    if (auth.token == false) {
        return auth.token ? <Navigate to="/login" /> : <Outlet />;
    }
}

export default PrivateRoutes