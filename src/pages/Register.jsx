import { useState } from 'react'

import { Link } from 'react-router-dom'

import Alert from '../components/Alert';
/** To communicate from react to backend **/
import axios from 'axios'
import axiosClient from '../config/axiosClient.jsx';
import logo from '/logo.png'

const Register = () => {
    /** Form States **/
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    /** Alert State. Its an object because it will have an error and a message **/
    const [alert, setAlert] = useState({})

    /** Handle Form Submit **/
    const handleSubmit = async e => {
        e.preventDefault();

        /** If some field have empty space set an error **/
        if ([name, email, password, repeat].includes('')) {
            setAlert({
                msg: 'All fields are required',
                error: true
            })
            return
        }

        /** If password and repeat password arent the same set an error **/
        if (password !== repeat) {
            setAlert({
                msg: 'Passwords are not equal',
                error: true
            })
            return
        }

        /** If password is shorter than 6 char set an error **/
        if (password.length < 6) {
            setAlert({
                msg: 'Passwords needs at least 6 characters',
                error: true
            })
            return
        }

        /** When validation is passed alert is setted to default **/
        setAlert({})

        /** Create the user at the api **/

        /** If some error happens on backend that error mesage will be sended to this catch error here on frontend **/
        try {
            /** Destructure data because .data is where the information we need is from the post request, (can check changing {data} by any variable name and cosol.log that variable) **/
            const { data } = await axiosClient.post('/users',
                { name, email, password })
            /** Set the message sent by the backend with res.json in the alert to show on the viewer  **/
            setAlert({
                msg: data.msg,
                error: false
            })

            setName('')
            setEmail('')
            setPassword('')
            setRepeat('')

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    /** Extract message from Alert in case it exist to render it to the Viewer **/
    const { msg } = alert


    return (
        <>
            {/** Title of the form **/}
            <img src={logo} width={250} height={250} alt="Logo" />
            <p>BETA v2.2</p>
            <h1 className='text-5xl font-bold text-center'>Create Your <span className='text-teal-500'>Account</span></h1>


            {/** Form **/}
            <form
                onSubmit={handleSubmit}
                className="my-10 shadow rounded-lg p-10">
                {/** Input for the name **/}
                <div className="my-5">
                    <label
                        className="text-gray-600 font-bold block mb-2"
                        htmlFor="name"
                    >Name{" "}</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        className="w-full rounded-lg bg-gray-50 p-2"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

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


                {/** Input for the password **/}
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

                {/** Input for repeat password **/}
                <div className="my-5">
                    <label
                        className="text-gray-600 font-bold block mb-2"
                        htmlFor="password2"
                    >Repeat Password{" "}</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Repeat your Password"
                        className="w-full rounded-lg bg-gray-50 p-2"
                        value={repeat}
                        onChange={e => setRepeat(e.target.value)}
                    />
                </div>


                {/** Input button for submit the form **/}
                <input
                    type="submit"
                    value="Create Account"
                    className="w-full p-3 font-bold rounded hover:cursor-pointer mb-5 hover:bg-teal-500 transition ease-in-out"
                />

                {/** Alert message renderer if needed **/}
                {msg && <Alert alert={alert} />}

            </form>

            {/** Navigation buttons**/}
            <nav className="lg:flex lg:justify-between lg:px-5">
                <Link
                    to="/"
                    className='block text-center my-5'
                >I already have an account</Link>

                <Link
                    to="/forgot-password"
                    className='block text-center my-5'
                >I forgot my password</Link>

            </nav>
        </>
    )
}

export default Register