import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
    // let auth = { token: true };
    const auth = JSON.parse(localStorage.getItem('auth') || '{"token": false}');

    if (auth.token) {
        return auth.token ? <Outlet /> : <Navigate to="/" />;
    }
    if (auth.token == false) {
        return auth.token ? <Outlet /> : <Navigate to="/login" />;
    }
}

export default PrivateRoutes