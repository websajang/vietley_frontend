import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Loader from '../components/Loader'

const ProtectedRoute = () => {

    const { auth, loading } = useAuth()

    /** Blocking the next lines of code here until it has _id **/

    if (loading) return <Loader />

    /** Here we can also setup the UI layout for the private area **/
    return (
        <>
            {/** Check if the user is authenticated. **/}

            {auth._id ? (
                <div className='font-sans'>
                    <Header />
                    <div className='md:flex'>
                        <main className='flex-1 m-5'>
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to='/' />}
        </>
    )
}

export default ProtectedRoute