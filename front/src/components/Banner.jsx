import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../styles/Banner.css';

function Banner() {
    return (
        <>
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
            <div className="lmj-Banner">
                <img src={logo} alt='Jungle House' className='jh-logo' style={{ width: 100 }} />
                <h1>Some Banner</h1>
            </div>
        </>
    )
}
export default Banner

