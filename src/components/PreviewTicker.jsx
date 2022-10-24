import { Link } from 'react-router-dom'

const PreviewTicker = ({ tickerName }) => {

    const { ticker, _id } = tickerName;

    return (
        <Link
            to={`${_id}`}
        >
            <div className='mt-5 w-full  flex flex-col-reverse hover:bg-teal-500 rounded-md p-2'>
                <div className=''>
                    {ticker}
                </div>


            </div>
        </Link>
    )
}

export default PreviewTicker