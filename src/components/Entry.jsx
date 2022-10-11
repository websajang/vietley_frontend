import { useEffect } from "react";
import useTickers from "../hooks/useTickers";


const Entry = ({ entry }) => {
    const { opened, callOrPut, buyOrSell, expiration, strike, qty, price, howIsEnded, closingDate, closingCost } = entry;
    const { handleModalEditEntry, handleModalDeleteEntry, ticker, credits, debits, setCredits, setDebits, totalCredits, setTotalCredits, totalDebits, setTotalDebits, setCurrentStrike, setTotalContracts } = useTickers();



    /** Functions to calculate the difference between opening date and closing date or current day **/

    const timeDifferenceClosedOption = (date1, date2) => {
        /** Calculate the time difference **/
        const differenceInTime = (new Date(date2).getTime()) - (new Date(date1).getTime());
        /** Number of days between the dates **/
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        /** Truncate the result **/
        const result = Math.trunc(differenceInDays)

        return result;
    }

    const timeDifferenceOpenedOption = date1 => {
        /** Today **/
        const currentDay = new Date();
        /** Calculate the time difference **/
        const differenceInTime = (currentDay.getTime()) - (new Date(date1).getTime());
        /** Number of days between the dates **/
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        /** Truncate the result **/
        const result = Math.trunc(differenceInDays)

        return result;
    }

    /*************************************************************************************************/

    /** Check if the credit is positive or negative depending upon the option is bought or sold **/
    const verifyCredit = (buyOrSell, price, qty) => {
        if (buyOrSell === 'sell') {
            return price * qty * 100
        } else {
            return price * qty * -100
        }
    }
    /** Check if the debit is positive or negative depending upon the option is bought or sold **/
    const verifyDebit = (buyOrSell, closingCost, qty) => {
        if (buyOrSell === 'sell') {
            return closingCost * qty * -100
        } else {
            return closingCost * qty * 100
        }
    }




    /********************************************************************************************************/
    /**********************************GENERAL INFORMATION OF THE TICKER*************************************/
    /********************************************************************************************************/
    //TODO: GENERAL INFO
    /** Gather all credits inside credits state array **/
    useEffect(() => {
        const entryCredit = verifyCredit(buyOrSell, price, qty)
        setCredits(current => [...current, entryCredit])
        const entryDebit = verifyDebit(buyOrSell, closingCost, qty)
        setDebits(current => [...current, entryDebit])
    }, [ticker])

    useEffect(() => {
        setCurrentStrike(strike)
        setTotalContracts(qty)
    }, [ticker])

    /********************************************************************************************************/
    /********************************************************************************************************/
    /********************************************************************************************************/



    return (
        <tr className="text-center text-sm">
            <td>
                {opened.split('T')[0]}
            </td>
            <td>
                {callOrPut}
            </td>
            <td>
                {buyOrSell}
            </td>
            <td>
                {expiration.split('T')[0]}
            </td>
            <td>
                {strike.toFixed(2)}
            </td>
            <td>
                {qty}
            </td>
            <td>
                {price.toFixed(2)}
            </td>
            {/** Credit **/}
            <td >
                {verifyCredit(buyOrSell, price, qty).toFixed(2)}

            </td>
            <td>
                {howIsEnded ? howIsEnded : '-'}
            </td>
            <td>
                {closingDate ? (closingDate.split('T')[0]) : '-'}
            </td>
            <td>
                {closingCost ? closingCost.toFixed(2) : '-'}
            </td>
            {/** Debit **/}
            <td>
                {closingCost ? (verifyDebit(buyOrSell, closingCost, qty)).toFixed(2) : '-'}
            </td>
            <td>
                {closingCost ? ((price * qty * 100) - (qty * closingCost * 100)).toFixed(2) : '-'}
            </td>
            <td>
                {closingDate ? timeDifferenceClosedOption(opened, closingDate) : timeDifferenceOpenedOption(opened)}
            </td>
            <td>
                <button className="text-slate-500 hover:text-black hover:bg-teal-500 rounded-md p-1" onClick={() => handleModalEditEntry(entry)}>Edit</button>
                <button className="text-slate-500 hover:text-black hover:bg-teal-500 rounded-md p-1 ml-3" onClick={() => handleModalDeleteEntry(entry)}>Delete</button>
            </td>
        </tr >
    )
}

export default Entry