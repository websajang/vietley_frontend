/** Let the content of child components of the parent Component **/
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (

        <main className='container relative overflow-hidden mx-auto lg:grid lg:grid-cols-8 min-h-screen bg-white'>

            <div className='col-span-2'>
                <div className='hidden relative lg:flex lg:justify-between'>
                    <span className='animatedballs8 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs14 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs9 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs10 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs15 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs11 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs12 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs7 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs13 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                </div>
            </div>
            <div className='col-span-4 xl:mx-20'>
                <Outlet />
            </div>
            <div className='col-span-2'>
                <div className='hidden relative lg:flex lg:justify-between'>
                    <span className='animatedballs8 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs14 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs9 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs10 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs15 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs11 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs12 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs7 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                    <span className='animatedballs13 relative w-3 h-3 bg-teal-500 my-1 rounded-full shadow-lg'></span>
                </div>
            </div>




        </main >





    )
}

export default AuthLayout