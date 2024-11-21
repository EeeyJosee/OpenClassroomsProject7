import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoutes from '../components/PrivateRoutes';
import '../styles/App.css';
import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';

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
