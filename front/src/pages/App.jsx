// import logo from '../assets/logo.svg';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  // let auth = { token: true };
  const auth = JSON.parse(localStorage.getItem('auth') || '{"token": false}');
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>

      {/* not sure if keeping this */}
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/signup" style={{ padding: 5 }}>
          SignUp
        </Link>
        <Link to="/login" style={{ padding: 5 }}>
          LogIn
        </Link>
      </nav>

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
