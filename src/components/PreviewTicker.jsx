import { Link } from 'react-router-dom'

const PreviewTicker = ({ tickerName }) => {

    const { ticker, _id } = tickerName;

    return (
        <Link
            to={`${_id}`}
        >
            <div className='mt-10 shadow-lg p-5 text-center text-3xl font-bold rounded-xl w-full h-50 flex flex-col-reverse bg-gradient-to-b from-teal-100 to-teal-500'>
                <div className=''>
                    {ticker}
                </div>
            </div>
        </Link>
    )
}

export default PreviewTicker