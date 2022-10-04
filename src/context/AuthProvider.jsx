/** contextAPI to share information through components **/

import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})

    const navigate = useNavigate()

    /** Wait for the token to be loaded before redirectionate **/
    const [loading, setLoading] = useState(true)

    /** Verify there is a token to authenticate the user **/
    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/users/profile', config);

                setAuth(data)

                navigate('/tickers')
            } catch (error) {
                setAuth({})
            } finally {
                setLoading(false)
            }


        }
        authenticateUser();
    }, [])


    //TODO: LOGOUT NOT WORKING
    const logOutAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                loading,
                logOutAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;