/** Let the content of child components of the parent Component **/
import { Outlet } from 'react-router-dom'
import Docs2 from '/Docs2.png'

const AuthLayout = () => {
    return (
        <section className='font-Roboto'>
            <div className='h-screen flex flex-col p-5 overflow-hidden'>
                <header className='w-full lg:h-28'>
                    <h1 className='text-center lg:text-start text-5xl lg:text-7xl font-bold'>VIETLEY<span className='text-lg text-gray-400'>stock options</span> </h1>
                </header>
                <div className='flex-1 lg:grid lg:grid-cols-3'>
                    <div className='text-center lg:text-start col-span-1 m-10 flex flex-col justify-around'>
                        <div className='mb-5'>
                            <h2 className='text-2xl font-bold'>JOIN OPTIONS TRADING <br></br>
                                COMMUNITY</h2>
                            <p>Create an account on Vietley and start tracking<br></br>
                                your option trades online.</p>
                        </div>
                        <div className='mb-5'>
                            <h2 className='text-2xl font-bold '>THE WHEEL OPTIONS <br></br>
                                STRATEGY</h2>
                            <p>Learn about the wheel trading strategy to create an<br></br>
                                extra income flow.</p>
                        </div>
                        <div className='mb-5'>
                            <h2 className='text-2xl font-bold '>FREE ACCOUNT TIER  <br></br>
                                FOREVER</h2>
                            <p>Enjoy your account for free forever with all <br></br>
                                the features you need.</p>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <img
                            src={Docs2}
                            alt='Options tracker'
                            title='Options tracker'
                            loading='eager'
                            className='object-top rounded-xl border-4 my-10 shadow-xl'
                        />
                    </div>

                </div>

            </div>
            <main className='container relative overflow-hidden mx-auto lg:grid lg:grid-cols-8 min-h-screen max-h-screen bg-white'>

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
                <div className='col-span-4 xl:mx-20 max-h-screen'>
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
        </section>





    )
}

export default AuthLayout