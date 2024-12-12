import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoutes from '../components/PrivateRoutes';
import LoggedRoutes from '../components/LoggedRoutes';
import Home from './Home';
import LogIn from './LogIn';
import Profile from './Profile';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<LoggedRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
