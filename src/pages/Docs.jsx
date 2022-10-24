import React from 'react'
import Docs2 from '/Docs2.png'
import Docs3 from '/Docs3.png'
import Docs1 from '/Docs1.png'

const Docs = () => {
    return (
        <section className=' lg:mx-40'>
            <h1 className="text-5xl mb-3 font-bold text-center">How to use<span className='text-teal-500'> Vietley</span> </h1>
            <h2 className='mt-10 text-3xl font-bold'>Create your <span className='text-teal-500'> Ticker</span> </h2>
            <div className='relative overflow-hidden mb-6'>
                <img
                    src={Docs1}
                    alt='empty-ticker'
                    className='object-top h-full w-full rounded-t-lg border-4 border-black my-10'
                />
                <p className='text-xl'>This is the main page of your account.</p>
                <ul className='mt-5'>
                    <li>Click on '+ New ticker' to create a new stock dashboard.</li>
                </ul>


                <h2 className='mt-10 text-3xl font-bold'>Fill with options and stock <span className='text-teal-500'> Information</span> </h2>
                <img
                    src={Docs2}
                    alt='empty-ticker'
                    className='object-top h-full w-full rounded-t-lg border-4 border-black my-10'
                />

                <p className='text-xl'>This is your new dashboard.</p>
                <ul className='mt-5'>
                    <li>Click on '+ Add option entry' to add option trades.</li>
                    <li>Click on '+ Add stock entry' when shares are assigned or called.</li>
                    <li>Option trades must be edited at trade closing.</li>
                </ul>


                <h2 className='mt-10 text-3xl font-bold'>Get an <span className='text-teal-500'> Overview</span> </h2>
                <img
                    src={Docs3}
                    alt='empty-ticker'
                    className='object-top h-full w-full rounded-t-lg border-4 border-black my-10'
                />
                <p className='text-xl'>Here is the insights section</p>
                <ul className='mt-5'>
                    <li>Check your trading visually.</li>
                    <li>With more features coming soon.</li>
                </ul>
            </div>
        </section>
    )
}

export default Docs