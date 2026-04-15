import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import Loading from '../components/Loading.jsx'

const Register = () => {

    const navigate = useNavigate();
    const {handleRegister , loading, user} = useAuth();

    if(user) {
        navigate("/")
    }

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
 


    const handleSubmit = async (e) => { 
        e.preventDefault();
        await handleRegister({username, email, password});
        navigate("/");
    }

    if(loading) {
        return <Loading />
    }

    return( 
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="Username">Username</label>
                        <input placeholder="Enter Username" type="text" id="Username" name="Username"
                            onChange={(e) => {setUsername(e.target.value)}}
                        />
                    </div>

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

                    <button className="button primary-button">Register</button>
                </form>

                <p>Already have an account? <Link to={"/login"}>&nbsp;Login</Link></p>
            </div>
        </main>
    )
}

export default Register;