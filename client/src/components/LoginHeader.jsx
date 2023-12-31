import { Link } from 'react-router-dom'
import sasquatch from '../assets/images/sasquatch.png'
import '../assets/css/LoginHeader.css'

//Export the LoginHeader page
export default function LoginHeader() {
    return (
        <div className='full-header'>
            <div className='mascot'>
                <img src={sasquatch} alt='sasquatch' />
            </div>
            <div className='login-header'>
                <nav className='redirect-about'>
                    <Link to="/about" className='about'>About</Link>
                </nav>
                <section className='sasquest'>
                    <div className='lg-letters'>
                        <h1>S</h1>
                    </div>
                    <div className='logo-middle'>
                        <h2>ASQUES</h2>
                        <p className='tagline'>
                            tame your beast
                        </p>
                    </div>
                    <div className='lg-letters'>
                        <h1>T</h1>
                    </div>
                </section>
            </div>
        </div >
    )
}