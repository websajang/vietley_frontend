/** Allow to read params from url **/
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useTickers from '../hooks/useTickers'
import ModalEntriesForm from '../components/ModalEntriesForm'
import Entry from '../components/Entry'
import ModalDeleteEntry from '../components/ModalDeleteEntry'
import ModalStockEntryForm from '../components/ModalStockEntryForm'
import StockEntry from '../components/StockEntry'
import ModalDeleteStock from '../components/ModalDeleteStock'
import Loader from '../components/Loader'
import axios from 'axios'

const Ticker = () => {



    //TODO: GENERAL INFO
    const params = useParams()
    const { getTicker,
        ticker,
        loading,
        deleteTicker,
        handleModalEntry,
        handleModalStock,
        credits, debits,
        totalCredits,
        setTotalCredits,
        totalDebits,
        setTotalDebits,
        wheelProfit,
        setWheelProfit,
        investedArray,
        invested,
        setInvested,
        sharesArray,
        setTotalShares,
        totalShares,
        originalCostBasis,
        setOriginalCostBasis,
        investedArrayCostBasis,
        setMedium,
        medium,
        setOverallProfit,
        overallProfit,
        currentStrike,
        totalContracts,
        setStrikeProfit,
        strikeProfitArray,
        stockPrice,
        strikeProfit,
        setExercisedProfit,
        exercisedProfit,
        setInvestedValue,
        investedValue,
        setCurrentValue,
        currentValue,
        setOverallProfitPercent,
        overallProfitPercent,
        setInvestedPercent,
        investedPercent,
        setWheelProfitPercent,
        wheelProfitPercent,
        setStrikeProfitPercent,
        strikeProfitPercent,
        setExercisedProfitPercent,
        exercisedProfitPercent,
        setAdjustedCostBasis,
        adjustedCostBasis,
        setStockPrice
    } = useTickers()

    const [modal, setModal] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {
        getTicker(params.id)


    }, [])

    console.log(ticker)


    const handleDelete = () => {
        if (confirm('Do you want to delete this Ticker?')) {
            deleteTicker(params.id)
        }
    }

    /** STOCK DATA **/
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://trading-view.p.rapidapi.com/stocks/get-financials',
            params: {
                columns: 'name,average_volume,close,open,change',
                symbol: `NASDAQ:${ticker.ticker}`,
                screenerName: 'america',
                lang: 'en'
            },
            headers: {
                'X-RapidAPI-Key': `${import.meta.env.VITE_GOOGLE_UR}`,
                'X-RapidAPI-Host': 'trading-view.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data.data[0].d[2])
            setStockPrice(response.data.data[0].d[2])
        }).catch(function (error) {
            console.error(error);
        });

    }, [])


    /********************************************************************************************************/
    /**********************************GENERAL INFORMATION OF THE TICKER*************************************/
    /********************************************************************************************************/

    //TODO: GENERAL INFO
    useEffect(() => {
        if (credits.length > 0) {
            const sum = credits.reduce((result, number) => result + number)
            setTotalCredits(sum)
        }
    }, [credits])

    useEffect(() => {
        if (debits.length > 0) {
            const sum = debits.reduce((result, number) => result + number)
            setTotalDebits(sum)
        }
    }, [debits])

    useEffect(() => {
        setWheelProfit(totalCredits + totalDebits)
    }, [totalCredits, totalDebits])




    useEffect(() => {
        if (investedArray.length > 0) {
            const sum = investedArray.reduce((result, number) => result + number)
            setInvested(sum)
        }
    }, [investedArray])


    useEffect(() => {
        if (sharesArray.length > 0) {
            const sum = sharesArray.reduce((result, number) => result + number)
            setTotalShares(sum)

        }
    }, [sharesArray, totalShares])

    useEffect(() => {
        if (investedArrayCostBasis.length > 0) {
            const sum = investedArrayCostBasis.reduce((result, number) => result + number)
            setMedium(sum)
            setOriginalCostBasis(medium / totalShares * (-1))
        }
    }, [totalShares, investedArray])

    useEffect(() => {
        setOverallProfit(wheelProfit + invested)
    }, [wheelProfit, invested])

    useEffect(() => {
        if (strikeProfitArray.length > 0) {
            const sharesOwned = strikeProfitArray.reduce((result, number) => result + number)
            setStrikeProfit((sharesOwned * currentStrike) + invested)
        }

        setExercisedProfit(strikeProfit + wheelProfit)
    }, [strikeProfitArray, invested, wheelProfit, strikeProfit])

    useEffect(() => {
        console.log('AQUII')
        console.log(stockPrice)
        const algo = () => {
            if (strikeProfitArray.length > 0) {
                const sharesOwned = strikeProfitArray.reduce((result, number) => result + number)
                if (sharesOwned != 0) {
                    return sharesOwned * originalCostBasis
                }
                if (stockPrice === 0) {
                    return originalCostBasis * totalContracts * 100
                }
                else {
                    return stockPrice * totalContracts * 100
                }
            }
        }
        setInvestedValue(algo())
    }, [strikeProfitArray, sharesArray, originalCostBasis, totalContracts, stockPrice])


    useEffect(() => {
        if (strikeProfitArray.length > 0) {
            const sharesOwned = strikeProfitArray.reduce((result, number) => result + number)

            setCurrentValue(sharesOwned * stockPrice)
        }
    }, [strikeProfitArray, stockPrice])

    useEffect(() => {
        setOverallProfitPercent(overallProfit / investedValue * 100)
    }, [overallProfit, investedValue])

    useEffect(() => {
        setInvestedPercent(invested / investedValue * 100)
    }, [invested, investedValue])

    useEffect(() => {
        setWheelProfitPercent(wheelProfit / investedValue * 100)

        console.log(wheelProfit)
        console.log(investedValue)
    }, [wheelProfit, investedValue])


    useEffect(() => {
        setStrikeProfitPercent(strikeProfit / investedValue * 100)
    }, [strikeProfit, investedValue])

    useEffect(() => {
        setExercisedProfitPercent(exercisedProfit / investedValue * 100)
    }, [exercisedProfit, investedValue])

    useEffect(() => {
        setAdjustedCostBasis((investedValue - wheelProfit) / 100);

    }, [wheelProfit, investedValue])
    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/

    /** Avoid Nan results function **/

    const avoidNaN = result => {
        if (isNaN(result) || typeof (result) == 'undefined') {
            return '-'
        } else {
            return result
        }
    }

    return (
        loading ? <Loader /> : (
            <>
                <div className='lg:flex lg:justify-between lg:p-10'>
                    <h1 className='text-center lg:text-start font-bold text-3xl'>{ticker.ticker}</h1>
                    {/** Add entries **/}
                    <div className='flex gap-16 mt-5 lg:mt-0'>
                        <button
                            onClick={handleModalEntry}
                            className='flex gap-2 place-items-center'
                            type='button'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add option entry</button>

                        <button
                            onClick={handleModalStock}
                            className='flex gap-2 place-items-center'
                            type='button'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add stock entry</button>
                    </div>

                    {/** BUTTONS **/}
                    <div className='hidden lg:flex gap-5'>
                        {/** Edit button **/}
                        <button className='flex place-items-center text-gray-400 hover:text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            <Link
                                to={`/tickers/edit/${params.id}`}
                            >
                                Edit</Link>
                        </button>

                        {/** Delete button **/}
                        <div className='flex place-items-center text-gray-400 hover:text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            <button
                                onClick={handleDelete}
                            >Delete</button>
                        </div>
                    </div>



                    <ModalEntriesForm
                        modal={modal}
                        setModal={setModal}
                    />
                    <ModalDeleteEntry />
                    <ModalStockEntryForm />
                    <ModalDeleteStock />
                </div>

                <div>
                    <div className='flex flex-col items-center lg:hidden'>
                        <h1 className='font-bold text-md'>Stock Price</h1>
                        <p className='text-xl'>{stockPrice.toFixed()}</p>
                    </div>
                    <section className='w-full h-32 px-5 grid grid-cols-2 lg:grid-cols-9 gap-3 p-5'>
                        <div className='hidden lg:flex flex-col items-center gap-3'>
                            <h1 className='font-bold text-2xl text-md'>Stock Price</h1>
                            <p className='text-xl'>{stockPrice}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Investment</h1>
                            <p>{`$${avoidNaN(investedValue)}`}</p>
                            <h1 className='font-bold text-md'>Current Value</h1>
                            <p>{`$${currentValue.toFixed(2)}`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Orig. Cost Basis</h1>
                            <p>{`$${originalCostBasis.toFixed(2)}`}</p>
                            <h1 className='font-bold text-md'>Adj. Cost Basis</h1>
                            <p>{`$${avoidNaN(adjustedCostBasis.toFixed(2))}`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Overall Profit</h1>
                            <p className={overallProfit >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`$${overallProfit.toFixed(2)}`}</p>
                            <h1 className='font-bold text-md'>Profit(%)</h1>
                            <p className={overallProfitPercent >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`${avoidNaN(overallProfitPercent.toFixed(2))}%`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Curr. Stock Profit</h1>
                            <p className={invested >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`$${invested.toFixed(2)}`}</p>
                            <h1 className='font-bold text-md'>Profit(%)</h1>
                            <p className={investedPercent >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`${avoidNaN(investedPercent.toFixed(2))}%`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Wheel Profit</h1>
                            <p className={wheelProfit >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`$${wheelProfit.toFixed(2)}`}</p>
                            <h1 className='font-bold text-md'>Profit(%)</h1>
                            <p className={wheelProfitPercent >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`${avoidNaN(wheelProfitPercent.toFixed(2))}%`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Strike Profit</h1>
                            <p className={strikeProfit >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`$${strikeProfit.toFixed(2)}`}</p>
                            <h1 className='font-bold text-md'>Profit(%)</h1>
                            <p className={strikeProfitPercent >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`${avoidNaN(strikeProfitPercent.toFixed(2))}%`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Exercised Profit</h1>
                            <p className={exercisedProfit >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`$${exercisedProfit.toFixed(2)}`}</p>
                            <h1 className='font-bold text-md'>Profit(%)</h1>
                            <p className={exercisedProfitPercent >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{`${avoidNaN(exercisedProfitPercent.toFixed(2))}%`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='font-bold text-md'>Total Contracts</h1>
                            <p>{totalContracts}</p>
                            <h1 className='font-bold text-md'>Current Strike</h1>
                            <p>{`$${currentStrike.toFixed(2)}`}</p>
                        </div>
                    </section>
                </div>

                <div className='hidden lg:grid grid-cols-6 gap-3'>
                    {/** Overall Info **/}

                    {/** Entries **/}
                    <section className='col-span-4 p-5'>
                        {/**********Ver im portant to put the '?' after entries because the entries object at the beggining is going to be empty 
                             * and dont have any entries and we gonna have an error because this javascript may run before the entries object is filled.
                             * With ? it is going to start running when and if entries are filled. */}
                        {ticker.entries?.length ?
                            (<table className='table-auto w-full'>
                                <thead>
                                    <tr className='text-sm'>
                                        <th>Opened</th>
                                        <th>Call/Put</th>
                                        <th>Buy/Sell</th>
                                        <th>Expiration</th>
                                        <th>Strike</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Credit</th>
                                        <th>Info</th>
                                        <th>Date Closed</th>
                                        <th>Closing Cost</th>
                                        <th>Debit</th>
                                        <th>Profit</th>
                                        <th>Days Held</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ticker.entries?.map(entry => (
                                        <Entry
                                            key={entry._id}
                                            entry={entry}
                                            setModalDelete={setModalDelete}
                                            modalDelete={modalDelete}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            ) :
                            null}

                    </section>
                    {/** Stock info **/}
                    <section className='col-span-2 p-5'>
                        {ticker.stockEntries?.length ? (
                            <table className='table-auto w-full'>
                                <thead>
                                    <tr className='text-sm'>
                                        <th>Date</th>
                                        <th>Info</th>
                                        <th>Buy/Sell</th>
                                        <th>Shares</th>
                                        <th>Cost</th>
                                        <th>Invested</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ticker.stockEntries?.map(stockEntry => (
                                        <StockEntry
                                            key={stockEntry._id}
                                            stockEntry={stockEntry}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        ) : null}
                    </section>


                </div>

            </>

        )

    )
}

export default Ticker