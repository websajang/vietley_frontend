import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
import axios from 'axios'
import axiosClient from '../config/axiosClient'
import logo from '/logo.png'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})


    const handleSubmit = async e => {
        e.preventDefault();

        if (email === '' || email.length < 6) {
            setAlert({
                msg: 'Email is required',
                error: true
            })
            return
        }

        try {
            const { data } = await axiosClient.post(`/users/forgot-password`, { email })

            setAlert({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert

    return (
        <>
            {/** Title of the form **/}
            <img src={logo} width={250} height={250} alt="Logo" />
            <p>BETA v2.2</p>
            <h1 className='text-5xl font-bold text-center'>Recover your <span className='text-teal-500'>Access</span></h1>

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

                {/** Input button for submit the form **/}
                <input
                    type="submit"
                    value="Send Instructions"
                    className="w-full p-3 font-bold rounded hover:cursor-pointer mb-5 hover:bg-teal-500 transition ease-in-out"
                />
            </form>

            {/** Navigation buttons**/}
            <nav className="lg:flex lg:justify-between lg:px-5">
                <Link
                    to="/register"
                    className='block text-center my-5'
                >Register new account</Link>
            </nav>

            {msg && <Alert alert={alert} />}
        </>
    )
}

export default ForgotPassword