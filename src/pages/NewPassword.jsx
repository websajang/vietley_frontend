import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import axiosClient from '../config/axiosClient'
import Alert from '../components/Alert'
import logo from '/logo.png'

const NewPassword = () => {

    const [validToken, setTokenValid] = useState(false)
    const [alert, setAlert] = useState({})
    const [password, setPassword] = useState('')
    const [passwordModified, setPasswordModified] = useState(false)

    const params = useParams()

    const { token } = params



    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axiosClient(`/users/forgot-password/${token}`)
                setTokenValid(true)

            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        verifyToken()
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (password.length < 6) {
            setAlert({
                msg: 'Password needs at least 6 characters',
                error: true
            })
            return
        }

        try {
            const url = `/users/forgot-password/${token}`

            const { data } = await axiosClient.post(url, { password })
            setAlert({
                msg: data.msg,
                error: false
            });

            setPasswordModified(true)
        } catch (error) {
            setAlert({
                msg: 'error.response.data.msg',
                error: true
            })
        }
    }


    const { msg } = alert;

    return (
        <>
            {/** Title of the form **/}
            <img src={logo} width={250} height={250} alt="Logo" />
            <p>BETA v2.2</p>
            <h1 className='text-5xl font-bold text-center'>New <span className='text-teal-500'>Password</span></h1>

            {/** if @validToken state is true, show the form  **/}


            {validToken && (
                <form
                    onSubmit={handleSubmit}
                    className="my-10 shadow rounded-lg p-10">
                    <div className="my-5">
                        <label
                            className="text-gray-600 font-bold block mb-2"
                            htmlFor="password">New Password{" "}</label>
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
                        value="Create New Password"
                        className="w-full p-3 font-bold rounded hover:cursor-pointer mb-5"
                    />

                </form>)}

            {/** If message is true its because there was an error so the alert message is displayed**/}
            {msg && <Alert alert={alert} />}

            {/** If the account is confirmed set a button to go login **/}
            {passwordModified && (<Link to="/"
                className='block text-center my-5'
            >Go to Login</Link>)
            }
        </>
    )
}

export default NewPassword