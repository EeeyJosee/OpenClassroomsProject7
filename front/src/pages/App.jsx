// import logo from '../assets/logo.svg';
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';

const PrivateRoutes = () => {
  // let auth = { token: true };
  const auth = JSON.parse(localStorage.getItem('auth') || '{"token": false}');
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
