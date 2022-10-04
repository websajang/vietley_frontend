import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'
/** Redirection when submitting **/
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const TickersContext = createContext();

const TickersProvider = ({ children }) => {

    /********************************************************************************************************/
    /**********************************GENERAL INFORMATION OF THE TICKER*************************************/
    /********************************************************************************************************/
    //TODO: GENERAL INFO

    /** Stock Price**/
    const [stockPrice, setStockPrice] = useState(0)

    /** Investment and current value **/
    const [investedValue, setInvestedValue] = useState(0)

    const [currentValue, setCurrentValue] = useState(0)


    /** Original cost basis and adjusted cost basis **/
    const [investedArrayCostBasis, setInvestedArrayCostBasis] = useState([])//All movements in negative needed to calculate original cost basis
    const [medium, setMedium] = useState(0)
    const [sharesArray, setSharesArray] = useState([])
    const [totalShares, setTotalShares] = useState(0)
    const [originalCostBasis, setOriginalCostBasis] = useState(0)

    const [adjustedCostBasis, setAdjustedCostBasis] = useState(0)

    /** Overall profit and profit % **/
    const [overallProfit, setOverallProfit] = useState(0)

    const [overallProfitPercent, setOverallProfitPercent] = useState(0)
    /** Current stock profit and profit % **/
    const [investedArray, setInvestedArray] = useState([])
    const [invested, setInvested] = useState(0)

    const [investedPercent, setInvestedPercent] = useState(0)
    /** WheelProfit and Profit % **/
    const [credits, setCredits] = useState([]);
    const [debits, setDebits] = useState([]);
    const [totalCredits, setTotalCredits] = useState(0)
    const [totalDebits, setTotalDebits] = useState(0)
    const [wheelProfit, setWheelProfit] = useState(0)


    const [wheelProfitPercent, setWheelProfitPercent] = useState(0)
    /** Strike Profit and profit % **/
    const [strikeProfitArray, setStrikeProfitArray] = useState([])
    const [strikeProfit, setStrikeProfit] = useState(0)

    const [strikeProfitPercent, setStrikeProfitPercent] = useState(0)
    /** Exercised Profit and profit % **/
    const [exercisedProfit, setExercisedProfit] = useState(0)

    const [exercisedProfitPercent, setExercisedProfitPercent] = useState(0)

    /** Total contracts and current strike **/
    const [totalContracts, setTotalContracts] = useState(0)
    const [currentStrike, setCurrentStrike] = useState(0)

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/

    /********************************************************************************************************/
    /******************************************AUTHORIZATION*************************************************/
    const { auth } = useAuth();
    /********************************************************************************************************/
    /********************************************************************************************************/

    /********************************************************************************************************/
    /*******************************************NAVIGATION***************************************************/
    const navigate = useNavigate();
    /********************************************************************************************************/
    /********************************************************************************************************/

    /********************************************************************************************************/
    /*******************************************NAVIGATION***************************************************/
    const [loading, setLoading] = useState(false)
    /********************************************************************************************************/
    /********************************************************************************************************/


    /********************************************************************************************************/
    /********************************************TICKERS*****************************************************/
    const [tickers, setTickers] = useState([]);
    /********************************************************************************************************/
    /********************************************************************************************************/

    /********************************************************************************************************/
    /********************************************TICKER*****************************************************/
    const [ticker, setTicker] = useState({})
    /********************************************************************************************************/
    /********************************************************************************************************/

    /********************************************************************************************************/
    /*********************************************ENTRY******************************************************/
    const [entry, setEntry] = useState({})
    /********************************************************************************************************/
    /********************************************************************************************************/

    /********************************************************************************************************/
    /**********************************************STOCK*****************************************************/
    const [stockEntry, setStockEntry] = useState({})
    /********************************************************************************************************/
    /********************************************************************************************************/

    /********************************************************************************************************/
    /*********************************************MODALS*****************************************************/
    const [modalEntriesForm, setModalEntriesForm] = useState(false)
    const [modalDeleteEntry, setModalDeleteEntry] = useState(false)


    const [modalStock, setModalStock] = useState(false)
    const [modalDeleteStock, setModalDeleteStock] = useState(false)
    /********************************************************************************************************/
    /********************************************************************************************************/



    /************************************************************************************************************************************************************************/
    /****************************************************************BRING TICKERS WHEN AUTH IS APPLIED *********************************************************************/
    /************************************************************************************************************************************************************************/
    useEffect(() => {
        const getTickers = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                /** Config for authorization **/
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/tickers', config)
                setTickers(data)

            } catch (error) {
                console.log(error)
            }
        }
        getTickers();
    }, [auth])

    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/



    /************************************************************************************************************************************************************************/
    /***************************************************************************** CRUD TICKER ******************************************************************************/
    /************************************************************************************************************************************************************************/

    const submitTicker = async ticker => {

        if (ticker.id) {
            await editTicker(ticker)
        } else {
            await newTicker(ticker)
        }


    }

    /********************************************************************************************************/
    /******************************************CREATE TICKER*************************************************/
    /********************************************************************************************************/

    const newTicker = async ticker => {
        /**I think bad fix about giving tickerName instead of ticker so the database schema doesnt accept it **/
        ticker.ticker = ticker.tickerName
        /******************************************************************************************************/
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            /** data is the response axios gives to us **/
            const { data } = await axiosClient.post('/tickers', ticker, config)

            /** Show the new ticker you just added without need to reload the page **/
            setTickers([...tickers, data])

            /** Redirection when submitting **/
            navigate('/tickers')

        } catch (error) {
            console.log(error)
        }
    }


    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/




    /********************************************************************************************************/
    /********************************************READ TICKER*************************************************/
    /********************************************************************************************************/
    const getTicker = async id => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`/tickers/${id}`, config)

            //TODO: GENERAL INFO
            setCredits([])
            setDebits([])
            setTotalCredits(0)
            setTotalDebits(0)
            setWheelProfit(0)

            setInvestedArray([])
            setInvested(0)

            setSharesArray([])
            setTotalShares(0)
            setOriginalCostBasis(0)

            setInvestedArrayCostBasis([])
            setMedium(0)

            setStrikeProfitArray([])
            setStrikeProfit(0)

            setInvestedValue(0)

            setCurrentValue(0)

            setTotalContracts(0)
            setCurrentStrike(0)

            setTicker(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/


    /********************************************************************************************************/
    /******************************************UPDATE TICKER*************************************************/
    /********************************************************************************************************/

    const editTicker = async ticker => {
        /**I think bad fix about giving tickerName instead of ticker so the database schema doesnt accept it **/
        ticker.ticker = ticker.tickerName
        /******************************************************************************************************/
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/tickers/${ticker.id}`, ticker, config)
            console.log(data)

            /** Syncronice State to show the updated information without reload the page  **/
            const tickersUpdated = tickers.map(tickerState => tickerState._id === data._id ? data : tickerState)
            setTickers(tickersUpdated)
            /** Redirect to tickers **/
            navigate('/tickers')

        } catch (error) {
            console.log(error)
        }



    }

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/


    /********************************************************************************************************/
    /******************************************DELETE TICKER*************************************************/
    /********************************************************************************************************/

    const deleteTicker = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }



            const { data } = await axiosClient.delete(`/tickers/${id}`, config)

            /** Syncronice State **/
            /** Whe syncronice State when deleting we need to use filter method **/
            const tickersUpdated = tickers.filter(tickerState => tickerState._id !== id)
            setTickers(tickersUpdated)

            /** Redirection when deleting **/
            navigate('/tickers')

        } catch (error) {
            console.log(error)
        }
    }

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/

    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/









    /************************************************************************************************************************************************************************/
    /***************************************************************************** CRUD ENTRY *******************************************************************************/
    /************************************************************************************************************************************************************************/

    const submitEntry = async entry => {

        if (entry?.id) {
            await editEntry(entry)
        } else {
            await createEntry(entry)
        }

    }

    const handleModalEntry = () => {
        setModalEntriesForm(!modalEntriesForm)
        setEntry({})
    }

    /********************************************************************************************************/
    /******************************************CREATE ENTRY**************************************************/
    /********************************************************************************************************/

    const createEntry = async entry => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }



            const { data } = await axiosClient.post(`/entries`, entry, config)
            console.log(data)

            /** Add entry to the state, to add the entry and show it with no page reload needed **/
            const tickerUpdated = { ...ticker }
            tickerUpdated.entries = [...ticker.entries, data]

            //TODO: GENERAL INFO
            setCredits([])
            setDebits([])
            setTotalCredits(0)
            setTotalDebits(0)
            setWheelProfit(0)

            setInvestedArray([])
            setInvested(0)

            setSharesArray([])
            setTotalShares(0)
            setOriginalCostBasis(0)

            setInvestedArrayCostBasis([])
            setMedium(0)

            setStrikeProfitArray([])
            setStrikeProfit(0)

            setInvestedValue(0)

            setCurrentValue(0)

            setTotalContracts(0)
            setCurrentStrike(0)

            setTicker(tickerUpdated)

        } catch (error) {
            console.log(error)
        }
    }

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/



    /********************************************************************************************************/
    /******************************************READ ENTRY****************************************************/
    /********************************************************************************************************/


    /**                               READ THROUGH GET TICKERS.ENTRIES                                     **/


    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/




    /********************************************************************************************************/
    /****************************************UPDATE ENTRY****************************************************/
    /********************************************************************************************************/

    const editEntry = async entry => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }


            const { data } = await axiosClient.put(`/entries/${entry.id}`, entry, config)

            /** Actualice Dom **/
            const updatedTicker = { ...ticker }
            updatedTicker.entries = updatedTicker.entries.map(entryState => entryState._id === data._id ? data : entryState)

            //TODO: GENERAL INFO
            setCredits([])
            setDebits([])
            setTotalCredits(0)
            setTotalDebits(0)
            setWheelProfit(0)

            setInvestedArray([])
            setInvested(0)

            setSharesArray([])
            setTotalShares(0)
            setOriginalCostBasis(0)

            setInvestedArrayCostBasis([])
            setMedium(0)

            setStrikeProfitArray([])
            setStrikeProfit(0)

            setInvestedValue(0)

            setCurrentValue(0)

            setTotalContracts(0)
            setCurrentStrike(0)

            setTicker(updatedTicker)

            setModalEntriesForm(false)
        } catch (error) {
            console.log(error)
        }
    }





    const handleModalEditEntry = entry => {
        setEntry(entry)
        setModalEntriesForm(true)
    }

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/




    /********************************************************************************************************/
    /****************************************DELETE ENTRY****************************************************/
    /********************************************************************************************************/

    const deleteEntry = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            /** Reminder: Dont pass entry in delete request... **/
            await axiosClient.delete(`/entries/${entry._id}`, config)

            /** Actualice Dom **/
            const updatedTicker = { ...ticker }
            updatedTicker.entries = updatedTicker.entries.filter(entryState => entryState._id !== entry._id)

            //TODO: GENERAL INFO
            setCredits([])
            setDebits([])
            setTotalCredits(0)
            setTotalDebits(0)
            setWheelProfit(0)

            setInvestedArray([])
            setInvested(0)

            setSharesArray([])
            setTotalShares(0)
            setOriginalCostBasis(0)

            setInvestedArrayCostBasis([])
            setMedium(0)

            setStrikeProfitArray([])
            setStrikeProfit(0)

            setInvestedValue(0)

            setCurrentValue(0)

            setTotalContracts(0)
            setCurrentStrike(0)

            setTicker(updatedTicker)

            setModalDeleteEntry(false)
            setEntry({})
        } catch (error) {
            console.log(error)
        }
    }


    const handleModalDeleteEntry = entry => {
        setEntry(entry)
        setModalDeleteEntry(!modalDeleteEntry)
    }

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/

    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/






    /************************************************************************************************************************************************************************/
    /***************************************************************************** CRUD STOCK *******************************************************************************/
    /************************************************************************************************************************************************************************/

    const submitStockEntry = async stock => {

        if (stock?.id) {
            await editStock(stock)
        } else {
            await newStock(stock)
        }

    }

    const handleModalStock = () => {
        setModalStock(!modalStock)
        setStockEntry({})
    }

    /********************************************************************************************************/
    /****************************************CREATE STOCK****************************************************/
    /********************************************************************************************************/

    const newStock = async stock => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/stock-entries`, stock, config)
            console.log(data)
            /** Add stockentry to the state **/
            const tickerUpdated = { ...ticker }
            tickerUpdated.stockEntries = [...ticker.stockEntries, data]

            //TODO: GENERAL INFO
            setCredits([])
            setDebits([])
            setTotalCredits(0)
            setTotalDebits(0)
            setWheelProfit(0)

            setInvestedArray([])
            setInvested(0)

            setSharesArray([])
            setTotalShares(0)
            setOriginalCostBasis(0)

            setInvestedArrayCostBasis([])
            setMedium(0)

            setStrikeProfitArray([])
            setStrikeProfit(0)

            setInvestedValue(0)

            setCurrentValue(0)

            setTotalContracts(0)
            setCurrentStrike(0)

            setTicker(tickerUpdated)

        } catch (error) {
            console.log(error)
        }
    }


    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/




    /********************************************************************************************************/
    /****************************************READ STOCK******************************************************/
    /********************************************************************************************************/



    /**                            READ THROUGH GET TICKERS.STOCKENTRIES                                   **/


    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/



    /********************************************************************************************************/
    /**************************************UPDATE STOCK******************************************************/
    /********************************************************************************************************/

    const editStock = async stock => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/stock-entries/${stock.id}`, stock, config)
            console.log(data)

            /** Actualice Dom **/
            const updatedTicker = { ...ticker }
            updatedTicker.stockEntries = updatedTicker.stockEntries.map(entryState => entryState._id === data._id ? data : entryState)

            //TODO: GENERAL INFO
            setCredits([])
            setDebits([])
            setTotalCredits(0)
            setTotalDebits(0)
            setWheelProfit(0)

            setInvestedArray([])
            setInvested(0)

            setSharesArray([])
            setTotalShares(0)
            setOriginalCostBasis(0)

            setInvestedArrayCostBasis([])
            setMedium(0)

            setStrikeProfitArray([])
            setStrikeProfit(0)

            setInvestedValue(0)

            setCurrentValue(0)

            setTotalContracts(0)
            setCurrentStrike(0)

            setTicker(updatedTicker)

        } catch (error) {
            console.log(error)
        }
    }




    const handleModalEditStock = stock => {
        setStockEntry(stock)
        setModalStock(true)
    }

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/


    /********************************************************************************************************/
    /**************************************DELETE STOCK******************************************************/
    /********************************************************************************************************/

    const deleteStock = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            /** Config for authorization **/
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/stock-entries/${stockEntry._id}`, config)
            console.log(data)

            /** Actualice Dom **/
            const updatedTicker = { ...ticker }
            updatedTicker.stockEntries = updatedTicker.stockEntries.filter(stockState => stockState._id !== stockEntry._id)

            //TODO: GENERAL INFO
            setCredits([])
            setDebits([])
            setTotalCredits(0)
            setTotalDebits(0)
            setWheelProfit(0)


            setInvestedArray([])
            setInvested(0)

            setSharesArray([])
            setTotalShares(0)
            setOriginalCostBasis(0)

            setInvestedArrayCostBasis([])
            setMedium(0)

            setStrikeProfitArray([])
            setStrikeProfit(0)

            setInvestedValue(0)

            setCurrentValue(0)

            setTotalContracts(0)
            setCurrentStrike(0)

            setTicker(updatedTicker)
            setModalDeleteStock(false)
            setStockEntry({})
        } catch (error) {
            console.log(error)
        }
    }


    const handleModalDeleteStock = stock => {
        setStockEntry(stock)
        setModalDeleteStock(!modalDeleteStock)
    }

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/

    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/
    /************************************************************************************************************************************************************************/



    //TODO: LOGOUT NOT WORKING
    const logOut = () => {
        setTickers([])
        setTicker({})
    }



    return (
        <TickersContext.Provider
            value={{
                tickers,
                submitTicker,
                getTicker,
                ticker,
                loading,
                deleteTicker,
                handleModalEntry,
                modalEntriesForm,
                submitEntry,
                handleModalEditEntry,
                entry,
                modalDeleteEntry,
                handleModalDeleteEntry,
                deleteEntry,
                logOut,
                handleModalStock,
                modalStock,
                submitStockEntry,
                handleModalEditStock,
                stockEntry,
                modalDeleteStock,
                handleModalDeleteStock,
                deleteStock,
                credits,
                debits,
                setCredits,
                setDebits,
                totalCredits,
                totalDebits,
                setTotalCredits,
                setTotalDebits,
                wheelProfit,
                setWheelProfit,
                investedArray,
                setInvestedArray,
                setInvested,
                invested,
                setSharesArray,
                sharesArray,
                setTotalShares,
                totalShares,
                originalCostBasis,
                setOriginalCostBasis,
                setInvestedArrayCostBasis,
                investedArrayCostBasis,
                setMedium,
                medium,
                setOverallProfit,
                overallProfit,
                setCurrentStrike,
                currentStrike,
                setTotalContracts,
                totalContracts,
                setStrikeProfitArray,
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
            }}
        >{children}
        </TickersContext.Provider>
    )
}

export {
    TickersProvider
}

export default TickersContext