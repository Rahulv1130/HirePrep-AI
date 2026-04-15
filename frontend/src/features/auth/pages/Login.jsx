import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../auth.form.scss'
import { useState } from 'react';
import Loading from '../components/Loading.jsx'

const Login = () => {

    const navigate = useNavigate();
    const {handleLogin, loading, user} = useAuth();

    if(user) {
        navigate("/")
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const result = await handleLogin({ email, password })
        if (result.ok) {
            navigate("/");
        } else {
            const msg = result.message || "Invalid email or password";
            setError(msg);
            window.alert(msg);
        }
    }

    if(loading) {
        return <Loading />
    }


    return( 
        <main>
            <div className="form-container">
                <h1>Login</h1>
                {error && <p style={{ color: "#ff4d4d", marginTop: 0 }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input placeholder="Enter Email Address" type="email" id="email" name="email"
                               onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input placeholder="Enter Password" type="password" id="password" name="password"
                               onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>

                    <button className="button primary-button">Login</button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>&nbsp;Sign Up</Link></p>
            </div>
        </main>
    )
}

export default Login;