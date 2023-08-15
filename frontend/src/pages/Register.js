import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import './styles/Register.css';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// To access the context.
import { useAuth } from '../context/AuthContext.js';

export default function Register() {

    const navigate = useNavigate();
    // Extract what we need. We change "errors" name to "registerErrors".
    const { register, isAuthenticated, errors: registerErrors } = useAuth();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // This redirects to the home page once the user is authenticated.
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const handleRegister = async (e) => {
        e.preventDefault();

        // We save the user data. 
        const user = {
            name: name,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        }

        // Function that handle the register post to the DB with the user data.
        await register(user);
    }

    return (
        <>
            <Navbar />

            <div className='register-container'>

                <div className="register-wrapper">

                    <h1 className='register-title'>CREATE AN ACCOUNT</h1>
                    {/* Errors */}
                    {
                        registerErrors && registerErrors.map((error, i) => (
                            <div className='errors' key={i}>
                                {error}
                            </div>
                        ))
                    }

                    <form className='register-form'>

                        <input className='register-input' name='name' placeholder="Name" type='text'
                            onChange={(e) => { setName(e.target.value) }} />
                        <input className='register-input' name='lastname' placeholder="Last name" type='text'
                            onChange={(e) => { setLastname(e.target.value) }} />
                        <input className='register-input' name='email' placeholder="Email" type='email'
                            onChange={(e) => { setEmail(e.target.value) }} />
                        <input className='register-input' name='username' placeholder="Username" type='text'
                            onChange={(e) => { setUsername(e.target.value) }} />
                        <input className='register-input' name='password' placeholder="Password" type='password'
                            onChange={(e) => { setPassword(e.target.value) }} />
                        <input className='register-input' name='confirmPassword' placeholder="Confirm Password" type='password' />

                        <span className="register-agreement">
                            By creating an account,
                            I consent to the processing of my personal data according to our
                            <b> Privacy Policy</b>.
                        </span>


                        <div className='form-footer'>
                            <button className='register-button' onClick={handleRegister}>REGISTER</button>

                            <Link to='/login'>Already have an account?</Link>
                        </div>

                    </form>

                </div>
            </div>

            <Footer />
        </>
    )
}
