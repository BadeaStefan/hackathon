import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export default function LoginPage() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();


    async function handleLogin(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const userData = { email: email, password: password };
        
        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok)
            {
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/home');
            }
        } catch (error) {
            console.log('something went wrong');
        }
    }
    
	return(
        <div className="form-container">
            <form className="form-div" onSubmit={handleLogin}>

                <input type="email" placeholder="Email" required ref={emailRef}></input>
                <input type="password" placeholder="Password" required ref={passwordRef}></input>
                <button className="button" type="submit">Log in</button>
                <p>Not registered ?</p>
                <Link to="/register" className="button">Register here</Link>
            </form>

        </div>
	);
}