import logo from '../assets/logo.svg';
import '../styles/Banner.css'

function Banner () {
    return (
        <div className="lmj-Banner">
            <img src={logo} alt='Jungle House' className='jh-logo' style={{ width: 100 }} />
            <h1>Some Banner</h1>
        </div>
    )
}
export default Banner