// import logo from '../assets/logo.svg';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import LogIn from './LogIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
