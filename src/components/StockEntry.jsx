import useTickers from "../hooks/useTickers"
import { useEffect } from 'react'

const StockEntry = ({ stockEntry, }) => {

    const { handleModalEditStock, handleModalDeleteStock, ticker, setInvestedArray, setSharesArray, setInvestedArrayCostBasis, setStrikeProfitArray, } = useTickers();

    const { date, assignedOrCalled, buyOrSell, shares, cost } = stockEntry;

    const verifyInvested = (buyOrSell, shares, cost) => {
        if (buyOrSell === 'sell') {
            return shares * cost
        } else {
            return shares * -cost
        }
    }

    /********************************************************************************************************/
    /**********************************GENERAL INFORMATION OF THE TICKER*************************************/
    /********************************************************************************************************/
    //TODO: GENERAL INFO
    useEffect(() => {
        const stockInvested = verifyInvested(buyOrSell, shares, cost)
        setInvestedArray(current => [...current, stockInvested])
        const stockInvestedNegative = stockInvested => {
            if (stockInvested <= 0) {
                return stockInvested
            } else {
                return stockInvested * (-1)
            }
        }
        setInvestedArrayCostBasis(current => [...current, stockInvestedNegative(stockInvested)])

        setSharesArray(current => [...current, shares])


        if (buyOrSell === 'sell') {
            const sellShares = shares * -1;
            setStrikeProfitArray(current => [...current, sellShares]);
        } else {
            const buyShares = shares
            setStrikeProfitArray(current => [...current, buyShares]);
        }


    }, [ticker])




    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/

    return (
        <tr className="text-center text-sm">
            <td>
                {date.split('T')[0]}
            </td>
            <td>
                {assignedOrCalled}
            </td>
            <td>
                {buyOrSell}
            </td>
            <td>
                {shares}
            </td>
            <td>
                {cost.toFixed(2)}
            </td>
            <td>
                {verifyInvested(buyOrSell, shares, cost).toFixed(2)}
            </td>
            <td>
                <button className="text-blue-500" onClick={() => handleModalEditStock(stockEntry)}>Edit</button>
                <button className="text-red-500 ml-3" onClick={() => handleModalDeleteStock(stockEntry)}>Delete</button>
            </td>
        </tr >
    )
}

export default StockEntry