import { Link } from 'react-router-dom';
import logo from '../assets/icon-left-font.png';
import '../styles/Banner.css';

function Banner() {
    return (
        <>
            <nav>
                <Link to="/signup">SignUp</Link>
                <Link to="/login">LogIn</Link>
                <Link to="/">Home</Link>
            </nav>
            <div className="imj-Banner">
                <img src={logo} alt='Jungle House' className='jh-logo' />
            </div>
        </>
    )
}

export default Banner

