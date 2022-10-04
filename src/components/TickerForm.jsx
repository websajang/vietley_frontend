import { useState, useEffect } from 'react'
import useTickers from '../hooks/useTickers'
import { useParams } from 'react-router-dom'

const TickerForm = () => {

    /** The ternary conditional for the button on the form that changes to Update or
     * Create depending upong we are editing or creating new ticker. Checking this with
     * the object _id, has an issue. If we go into edit but then we click to new ticker
     * the button is keeping the Update conditional.
     * For this we are going to create the id state **/

    const [id, setId] = useState(null)

    const [tickerName, setTickerName] = useState('');
    const { submitTicker, ticker } = useTickers();

    const params = useParams();

    useEffect(() => {
        /** Both conditions because params.id loads faster than ticker.ticker
         * or we could also just put ticker.ticker because it depends already on params.id **/
        if (params.id && ticker.ticker) {
            setTickerName(ticker.ticker)
            setId(ticker._id)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if (tickerName === ('')) {

            return;
        }

        /** Send data to provider **/
        await submitTicker({ tickerName, id })
        setId(null)
        setTickerName('')

    }

    return (
        <form
            onSubmit={handleSubmit}
            className='lg:py-10 lg:px-5 md:w-1/2 rounded-lg shadow-xl'>
            <div className=''>
                <label
                    className='font-bold text-md'
                    htmlFor='name'
                >Ticker Name</label>
                <input
                    id='name'
                    type='text'
                    className='border-2 p-2 rounded-full w-full mt-5'
                    placeholder='INTC, TSLA, GME...'
                    value={tickerName}
                    onChange={e => setTickerName(e.target.value)}
                ></input>
                <input
                    type='submit'
                    className='w-full text-center my-5 cursor-pointer'
                    value={id ? 'Update' : 'Create'} />
            </div>
        </form>
    )
}

export default TickerForm