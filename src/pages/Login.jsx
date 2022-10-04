import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
import axiosClient from '../config/axiosClient'
import useAuth from '../hooks/useAuth'
import logo from '/logo.png'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    /** Calling the hook to use context API and destructure to get the states we need, also need to put them inside vaue{{}} in AuthProvider.jsx **/
    const { setAuth } = useAuth();


    const navigate = useNavigate();



    const handleSubmit = async e => {
        e.preventDefault();
        if ([email, password].includes('')) {
            setAlert({
                msg: 'All fields are required',
                error: true
            })
            return
        }




        try {
            const { data } = await axiosClient.post('/users/login', { email, password })

            setAlert({})

            /** Saving authentication in localstorage **/
            localStorage.setItem('token', data.token)

            setAuth(data)
            navigate('/tickers')
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert;


    return (

        <div>
            <div className='border-2 border-red-500 rounded-md p-5 mb-10'>This is a private beta. For the moment to log in and try the APP, you have register
                and send an email to websajang@gmail.com and ask for the token url to activate your account.
                <br />
                The APP is on development so dont use here the same password you use for your email or any other
                account. Even though it will be hashed before entering the database.
            </div>

            {/** Title of the form **/}
            <img src={logo} width={250} height={250} alt="Logo" />
            <p>BETA v2.2</p>
            <h1 className='text-5xl font-bold text-center'>Log <span className='text-teal-500'>In</span></h1>

            {/** Form **/}
            <form

                onSubmit={handleSubmit}
                className="my-10 shadow rounded-lg p-10">

                {/** Input for the email **/}
                <div className="my-5">
                    <label
                        className="text-gray-600 font-bold block mb-2"
                        htmlFor="email"
                    >Email{" "}</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        className="w-full rounded-lg bg-gray-50 p-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>


                {/** Input for the email **/}
                <div className="my-5">
                    <label
                        className="text-gray-600 font-bold block mb-2"
                        htmlFor="password"
                    >Password{" "}</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Your Password"
                        className="w-full rounded-lg bg-gray-50 p-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>


                {/** Input button for submit the form **/}
                <input
                    type="submit"
                    value="Login"
                    className="w-full p-3 font-bold rounded hover:cursor-pointer mb-5"
                />
            </form>

            {msg && <Alert alert={alert} />}

            {/** Navigation buttons**/}
            <nav className="lg:flex lg:justify-between lg:px-5">
                <Link
                    to="/register"
                    className='block text-center my-5'
                >Register new account</Link>

                <Link
                    to="/forgot-password"
                    className='block text-center my-5'
                >I forgot my password</Link>

            </nav>
        </div>
    )
}

export default Login