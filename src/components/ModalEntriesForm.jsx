import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useTickers from '../hooks/useTickers'
import { useParams } from 'react-router-dom'


const ModalEntriesForm = ({ setCredits }) => {



    const params = useParams();

    const [id, setId] = useState('')
    const [opened, setOpened] = useState('')
    const [callOrPut, setCallOrPut] = useState('')
    const [buyOrSell, setBuyOrSell] = useState('')
    const [expiration, setExpiration] = useState('')
    const [strike, setStrike] = useState('')
    const [qty, setQty] = useState('')
    const [price, setPrice] = useState('')
    const [howIsEnded, setHowIsEnded] = useState('')
    const [closingDate, setClosingDate] = useState('')
    const [closingCost, setClosingCost] = useState('')


    const { handleModalEntry, modalEntriesForm, submitEntry, entry } = useTickers()


    /** Fill form when edit**/

    /** Need to put if(entry?._id){}..  to solve this problem:
     * Warning: A component is changing a controlled input to be uncontrolled. 
     * This is likely caused by the value changing from a defined to undefined,
     *  which should not happen. Decide between using a controlled or uncontrolled 
     * input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components **/
    useEffect(() => {
        if (entry._id) {
            setId(entry._id)
            setOpened(entry.opened?.split('T')[0])
            setCallOrPut(entry.callOrPut)
            setBuyOrSell(entry.buyOrSell)
            setExpiration(entry.expiration.split('T')[0])
            setStrike(entry.strike)
            setQty(entry.qty)
            setPrice(entry.price)
            setHowIsEnded(entry.howIsEnded)
            avoidNullsetClosingDate()
            avoidNullsetClosingCost()
            return
        }
        setOpened('')
        setCallOrPut('')
        setBuyOrSell('')
        setExpiration('')
        setStrike('')
        setQty('')
        setPrice('')
        setHowIsEnded('')
        setClosingDate('')
        setClosingCost('')

    }, [entry])

    /** Avoid null to fill the form when edditing **/
    const avoidNullsetClosingDate = parameter => {
        if (parameter === null) {
            setClosingDate('')
        } else {
            setClosingDate(entry.closingDate?.split('T')[0])
        }
    }

    const avoidNullsetClosingCost = parameter => {
        if (parameter === null) {
            setClosingCost('')
        } else {
            setClosingCost(entry.closingCost)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        /** Need to create this alert **/
        if ([opened, callOrPut, buyOrSell, expiration, strike, qty, price].includes('')) {
            console.log('All fields are required')
            return
        }

        await submitEntry({ id, opened, callOrPut, buyOrSell, expiration, strike, qty, price, howIsEnded, closingDate, closingCost, ticker: params.id })
        setId('')
        handleModalEntry()

    }

    return (

        /** Show when modal = true **/
        <Transition.Root show={modalEntriesForm} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalEntry}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalEntry}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    {/******************************** All the content here ************************************/}
                                    <Dialog.Title as="h3" className=" leading-6 font-bold text-gray-900 text-center text-xl">

                                        Option entry


                                    </Dialog.Title>

                                    <form
                                        onSubmit={handleSubmit}
                                        className='my-10'>
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='opened'
                                            >
                                                Opened
                                            </label>
                                            <input
                                                id='opened'
                                                type='date'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={opened}
                                                onChange={e => setOpened(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='callorput'
                                            >
                                                Call/Put
                                            </label>
                                            <select
                                                id='callorput'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={callOrPut}
                                                onChange={e => setCallOrPut(e.target.value)}
                                            >
                                                <option>--Select--</option>
                                                <option value='call'>Call</option>
                                                <option value='put'>Put</option>
                                            </select>
                                        </div>



                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='buyorsell'
                                            >
                                                Buy/Sell
                                            </label>
                                            <select
                                                id='buyorsell'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={buyOrSell}
                                                onChange={e => setBuyOrSell(e.target.value)}
                                            >
                                                <option>--Select--</option>
                                                <option value='buy'>Buy</option>
                                                <option value='sell'>Sell</option>
                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='expiration'
                                            >
                                                Expiration
                                            </label>
                                            <input
                                                id='expiration'
                                                type='date'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={expiration}
                                                onChange={e => setExpiration(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='strike'
                                            >
                                                Strike
                                            </label>
                                            <input
                                                id='expiration'
                                                type='number'
                                                step='any'
                                                min='0'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={strike}
                                                onChange={e => setStrike(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='qty'
                                            >
                                                Quantity of contracts
                                            </label>
                                            <input
                                                id='qty'
                                                type='number'
                                                min='0'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={qty}
                                                onChange={e => setQty(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='price'
                                            >
                                                Contract price
                                            </label>
                                            <input
                                                id='price'
                                                type='number'
                                                step='any'
                                                min='0'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={price}
                                                onChange={e => setPrice(e.target.value)}
                                            >

                                            </input>
                                        </div>



                                        <h1 className='my-5 text-gray-700 uppercase text-center'>Edit from here onwards once your option/options are expired/assigned/called</h1>


                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='howisended'
                                            >
                                                Expired/Assigned/Rolled
                                            </label>
                                            <select
                                                id='howisended'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={howIsEnded}
                                                onChange={e => setHowIsEnded(e.target.value)}
                                            >
                                                <option>--Select--</option>
                                                <option value='expired'>Expired</option>
                                                <option value='exercised'>Exercised</option>
                                                <option value='assigned'>Assigned</option>
                                                <option value='called'>Called</option>
                                                <option value='rolled'>Rolled</option>
                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='closingdate'
                                            >
                                                Closing date
                                            </label>
                                            <input
                                                id='closingdate'
                                                type='date'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={closingDate}
                                                onChange={e => setClosingDate(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='closingcost'
                                            >
                                                Closing cost
                                            </label>
                                            <input
                                                id='closingcost'
                                                type='number'
                                                step='any'
                                                min='0'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={closingCost}
                                                onChange={e => setClosingCost(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <input
                                            type='submit'
                                            className='p-3 w-full font-bold cursor-pointer text-center rounded-md border-2 border-black'
                                            value='Save'
                                        />

                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalEntriesForm