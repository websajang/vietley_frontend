import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    /** Get information about name and email **/
    const { auth, logOut, logOutAuth } = useAuth();
    //TODO: LOGOUT NOT WORKING
    const handleLogOut = () => {
        logOut();
        logOutAuth();
        /** Reset Localstorage **/
        localStorage.deleteItem('token')
    }
    return (
        <aside className='md:w-30 px-5 py-10' >
            <p className='text-lg text-center text-orange-600 font-bold '>{auth.name}</p>
            <p className='text-center text-gray-500'>{auth.email}</p>
            <h1 className='text-2xl'>Account</h1>
            <Link
                to="/tickers"
                className='w-full px-3 py-1 block'
            >Tickers</Link>
            <Link
                to="#"
                className='w-full px-3 py-1 block'
            >Net Worth</Link>
            <h1 className='text-2xl mt-3'>Settings</h1>
            <Link
                to="#"
                className='w-full px-3 py-1 block'
            >Theme</Link>
            <Link
                onClick={handleLogOut}
                to="#"
                className='w-full px-3 py-1 block'
            >Log out</Link>
        </aside>
    )
}

export default Sidebar