import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useTickers from '../hooks/useTickers';
import { useParams } from 'react-router-dom'


const ModalStockEntryForm = () => {

    const params = useParams();

    const { handleModalStock, modalStock, submitStockEntry, stockEntry } = useTickers();

    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [assignedOrCalled, setAssignedOrCalled] = useState('')
    const [buyOrSell, setBuyOrSell] = useState('')
    const [shares, setShares] = useState('')
    const [cost, setCost] = useState('')


    /** Need to put if(stockEntry?._id){}..  to solve this problem:
     * Warning: A component is changing a controlled input to be uncontrolled. 
     * This is likely caused by the value changing from a defined to undefined,
     *  which should not happen. Decide between using a controlled or uncontrolled 
     * input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components **/
    useEffect(() => {
        if (stockEntry?._id) {
            setId(stockEntry._id)
            setDate(stockEntry.date?.split('T')[0])
            setAssignedOrCalled(stockEntry.assignedOrCalled)
            setBuyOrSell(stockEntry.buyOrSell)
            setShares(stockEntry.shares)
            setCost(stockEntry.cost)
            return
        }
        setId('')
        setDate('')
        setAssignedOrCalled('')
        setBuyOrSell('')
        setShares('')
        setCost('')
    }, [stockEntry]);


    const handleStockEntrySubmit = async e => {
        e.preventDefault();

        if ([date, assignedOrCalled, buyOrSell, shares, cost].includes('')) {
            console.log('All fields are required')
            return
        }

        await submitStockEntry({ id, date, assignedOrCalled, buyOrSell, shares, cost, ticker: params.id })
        handleModalStock()

        setId('')
        setDate('')
        setAssignedOrCalled('')
        setBuyOrSell('')
        setShares('')
        setCost('')
    }

    return (
        <Transition.Root show={modalStock} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalStock}>
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
                                    onClick={handleModalStock}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        Stock entry
                                    </Dialog.Title>

                                    <form
                                        onSubmit={handleStockEntrySubmit}
                                        className='my-10'>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='date'
                                            >
                                                Date
                                            </label>
                                            <input
                                                id='date'
                                                type='date'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='assignedorcalled'
                                            >
                                                Assigned/Called
                                            </label>
                                            <select
                                                id='assignedorcalled'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={assignedOrCalled}
                                                onChange={e => setAssignedOrCalled(e.target.value)}
                                            >
                                                <option>--Select--</option>
                                                <option value='assigned'>Assigned</option>
                                                <option value='called'>Called</option>
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
                                                htmlFor='shares'
                                            >
                                                Shares
                                            </label>
                                            <input
                                                id='shares'
                                                type='number'
                                                min='0'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={shares}
                                                onChange={e => setShares(e.target.value)}
                                            >

                                            </input>
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 font-bold'
                                                htmlFor='cost'
                                            >
                                                Cost
                                            </label>
                                            <input
                                                id='shares'
                                                type='number'
                                                step='any'
                                                min='0'
                                                className='border-2 w-full p-2 mt-2 rounded-md'
                                                value={cost}
                                                onChange={e => setCost(e.target.value)}
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

export default ModalStockEntryForm