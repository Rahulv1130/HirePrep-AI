import { useContext, useEffect } from "react";
import { AuthContext } from '../auth.context.jsx'
import { getMe, login , logout , register } from '../services/auth.api.js'

export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try{
            const data = await login({ email, password });
            setUser(data.user);
            return { ok: true };
        }
        catch(err) {
            return { ok: false, message: err?.message || "Invalid credentials" };
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username , email , password }) => {
        setLoading(true);
        try{
            const data = await register({ username, email, password });
            setUser(data.user);
        }
        catch(err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try{
            await logout();
            setUser(null);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const getAndSetUser = async() => {
            const data = await getMe();
            if(data?.user) {
                setUser(data.user);
            } else {
                setUser(null)
            }
            setLoading(false);
        }

        getAndSetUser();
    }, [])

    return { user, loading, handleLogin, handleLogout, handleRegister }
}