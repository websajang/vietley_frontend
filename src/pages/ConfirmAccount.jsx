import { useEffect, useState } from "react"
/** useParams is to read values on url **/
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"
import logo from '/logo.png'

const ConfirmAccount = () => {

    /** Set the alert **/
    const [alert, setAlert] = useState({});
    /** Set the alert when account is confirmed **/
    const [confirmedAccount, setConfirmedAccount] = useState(false);

    /** Get web params **/
    const params = useParams();
    /** Get the id from params where the information about the token for confirmation is **/
    const { id } = params;

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `/users/confirm/${id}`
                const { data } = await axiosClient(url)
                setAlert({
                    msg: data.msg,
                    error: false
                })

                setConfirmedAccount(true)
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        confirmAccount()
    }, [])

    const { msg } = alert

    return (
        <>
            {/** Title **/}
            <img src={logo} width={250} height={250} alt="Logo" />
            <p>BETA v2.2</p>
            <h1 className='text-5xl font-bold text-center'>Confirm Your<span className='text-teal-500'>Account</span></h1>

            {/** Confirmation message **/}
            <div>
                {msg && <Alert alert={alert} />}

                {/** If the account is confirmed set a button to go login **/}
                {confirmedAccount && (<Link to="/"
                    className='block text-center my-5 '
                >Go to Login</Link>)
                }
            </div>
        </>
    )

}

export default ConfirmAccount