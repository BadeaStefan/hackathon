import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function RegisterPage() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        const userData = { name: name, email: email, password: password }

        if (confirmPassword === password) {
            try {
                const response = await fetch("http://localhost:3000/api/users/register", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                const data = await response.json();
                localStorage.setItem('userInfo', JSON.stringify(data));
                
                navigate('/home');
            } catch (error) {
                console.log("error at registration");
            }
        } else {
            alert('Passwords do not match !');
        }

    }

    return (
        <div className="form-container">
            <form className="form-div" onSubmit={handleRegister}>

                <input type="text" placeholder="Name" required ref={nameRef}></input>
                <input type="email" placeholder="Email" required ref={emailRef}></input>
                <input type="password" placeholder="Password" required ref={passwordRef}></input>
                <input type="password" placeholder="Confirm password" required ref={confirmPasswordRef}></input>
                <button className="button" type="submit">Register</button>
                <p>Already registered ?</p>
                <Link to="/login" className="button">Go to log in</Link>
            </form>

        </div>
    );
} 