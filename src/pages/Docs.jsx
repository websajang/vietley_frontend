import React from 'react'
import emptyTickerShow from '/emptyTickerShow.png'
import tickerFilledShow from '/tickerFilledShow.png'
import tickersShow from '/tickersSHOW.png'

const Docs = () => {
    return (
        <section className=' lg:mx-40'>
            <h1 className="text-5xl mb-3 font-bold text-center">How to use<span className='text-teal-500'> Vietley</span> </h1>
            <h2 className='mt-10 text-3xl font-bold'>Create your <span className='text-teal-500'> Ticker</span> </h2>
            <div className='relative overflow-hidden mb-6'>
                <img
                    src={tickersShow}
                    alt='empty-ticker'
                    className='object-top h-full w-full rounded-t-lg border-4 border-black my-10'
                />
                <p className='text-xl'>Here is the main page of your account. Click on New ticker to create a new stock where you are going to perfor the wheel
                    strategy on. I recommend to set the name as the ticker of the company. This name you provide will be the label to fetch
                    the market data.

                    You can have as many tickers as you want. Also edit the name or delete the entire ticker later on.
                </p>

                <h2 className='mt-10 text-3xl font-bold'>Fill with options and stock <span className='text-teal-500'> Information</span> </h2>
                <img
                    src={emptyTickerShow}
                    alt='empty-ticker'
                    className='object-top h-full w-full rounded-t-lg border-4 border-black my-10'
                />
                <p className='text-xl'>This is the ticker page. Set all the information about your option movements and your stock movements as well</p>
                <p className='text-xl'>Here is where you can also delete or edit the name of your ticker.</p>
                <h2 className='mt-10 text-3xl font-bold'>Get an <span className='text-teal-500'> Overview</span> </h2>
                <img
                    src={tickerFilledShow}
                    alt='empty-ticker'
                    className='object-top h-full w-full rounded-t-lg border-4 border-black my-10'
                />
                <p className='text-xl'>Check fast how your wheel strategy is going on the general information with more features
                    coming soon.</p>

                <h2 className='mt-10 text-3xl font-bold'>How is it <span className='text-teal-500'>Calculated</span> </h2>
                <p className='text-xl'>
                    <ul className='mt-5'>
                        <li className='mt-5'><b>Stock Price:</b></li>
                        <p>The stock price comes from a stock prices web api, using the name of the ticker to find the data.</p>
                        <li className='mt-5'><b>Investment:</b></li>
                        <p>This is the quantiy of money we could say you are risking performing the wheel strategy. If you are assigned
                            some quantity of shares this will set as number of shares you are owning at this moment * the original cost basis.
                        </p>
                        <li className='mt-5'><b>Current Value:</b></li>
                        <p>This is the quantiy of money we could say you are risking performing the wheel strategy. If you are assigned
                            some quantity of shares this will set as number of shares you are owning at this moment * the original cost basis.

                            If you dont own any shares this number will be the stock price * number of contracts you currently have * 100.
                        </p>
                        <li className='mt-5'><b>Original Cost Basis:</b></li>
                        <li className='mt-5'><b>Adjusted Cost Basis:</b></li>
                        <p>Its the price of the cost of the shares if you have them or the cost of the shares you
                            will buy taking into account your profits with the wheel strategy. Invested - Wheel profit / 100.
                        </p>
                        <li className='mt-5'><b>Overall Profit:</b></li>
                        <p>Total profit with options and stock movements. Stock profit + Wheel profit.</p>
                        <li className='mt-5'><b>Current Stock Profit:</b></li>
                        <p>Gains with stock movements. This parameter shows better when we do not own shares.</p>
                        <li className='mt-5'><b>Wheel Profit:</b></li>
                        <p>Profits taken with premiums performing the wheel.</p>
                        <li className='mt-5'><b>Strike Profit:</b></li>
                        <p>The profit you will take from the stock if you are assigned</p>
                        <li className='mt-5'><b>Exercised Profit:</b></li>
                        <p>Its the same as strike profit but counting the wheel profit also. </p>
                        <li className='mt-5'><b>Total Contracts:</b></li>
                        <p>The number of contracts you are currently playing with.</p>
                        <li className='mt-5'><b>Current Strike:</b></li>
                        <p>The strike price of the last option you currently have.</p>

                    </ul>

                </p>

            </div>
        </section>
    )
}

export default Docs