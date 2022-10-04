import React from 'react'
import logo from '/logo.png'
import tickerFilledShow from '/tickerFilledShow.png'

const Post = () => {
    return (
        <div className='shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden shadow-md mb-6'>
                <img
                    src={tickerFilledShow}
                    alt='ticker-filled-show'
                    className='object-top h-full w-full rounded-t-lg'
                />
            </div>
            <div className='px-4 lg:px-0'>
                <div className='flex items-center mb-8 w-full'>

                    <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                        <img
                            alt='authorname'
                            height="30px"
                            width="30px"
                            className='align-middle rounded-full'
                            src={logo}
                        />
                        <p className='inline align-middle text-gray-700 ml-2 text-lg'>David</p>
                    </div>
                    <div className='font-medium flex flex-row justify-center text-gray-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                        <span className='ml-2'>
                            <p>03/Oct/2022</p>
                        </span>

                    </div>

                </div>
                <h1 className='mb-8 text-3xl font-semibold'>First Deployment on the web. Beta v2.2.</h1>
                <p>First time this web is deployed on the web. Is a private beta, to get access user need to contact
                    the administrator to get the token to activate an account. The Wheel strategy tracker is working
                    but with some bugs to fix. For the moment you can not close the options even they expired worthless
                    with price 0. It has to be at least 0.01.

                    If the internet goes off the parameters of the general info are not reseted so they keep stacking.
                    But this is fixed when internet comes back and the page is realoaded. Also if the stock api doesnt send
                    the stock price it keeps the price from the previous ticker you have visited.

                    Email api is not implemented and the stock api only holds 500 requests per month as it is the free tier
                    until the webAPP is working well and opened to the public.
                </p>
                <h2 className='mt-5 font-bold'>WHATS NEXT?</h2>
                <p>The next steps on <b>short time period</b> will be fix the bugs that I already encountered plus the ones the users give me
                    in their feedback. Improve UX/UI for a better looking and user experience. Including better mobile
                    accesibility. Add insights section for each ticker as
                    days average you hold the options, if you are making more with calls or puts and so on. Also a graphic to see your
                    gains through time. </p>
                <p>For <b>longer time period</b>  I will implement wealth tracker to keep track of your net worth including
                    assets and debts. Also for the moment you can only track the wheel strategy here but I will be creating
                    more trackers for the rest of the option strategies.
                </p>

            </div>
        </div>

    )
}

export default Post