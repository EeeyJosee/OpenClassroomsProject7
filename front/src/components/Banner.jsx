import { Link } from 'react-router-dom';
import logo from '../assets/icon-left-font.png';
import '../styles/Banner.css';

function Banner() {
    // let auth = { token: true };
    const auth = JSON.parse(localStorage.getItem('auth') || '{"token": false}');
    const handleClick = () => {
        localStorage.clear();
    }

    return (
        <>
            <nav>
                {!auth.token && <Link to="/signup">SignUp</Link>}
                {!auth.token && <Link to="/login">LogIn</Link>}
                {auth.token && <Link to="/">Home</Link>}
                {auth.token && <Link to="/login" onClick={handleClick}>Sign Out</Link>}
            </nav>
            <div className="imj-Banner">
                <img src={logo} alt='Groupomania Image Banner' className='jh-logo' />
            </div>
        </>
    )
}

export default Banner