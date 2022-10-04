import { Link } from "react-router-dom"
import useTickers from "../hooks/useTickers"
import PreviewTicker from "../components/PreviewTicker";
import useAuth from "../hooks/useAuth";

const Tickers = () => {


    const { auth } = useAuth();
    const { tickers } = useTickers();

    return (
        <div className="text-center font-bold lg:text-start lg:p-10">
            <h1 className="text-5xl mb-3"><span className='text-teal-500'>{auth.name}</span> Tickers</h1>
            {/** New Ticker button **/}
            <button>
                <Link
                    to="create-ticker"
                >
                    <div className="flex flex-row place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p className="text-lg">New Ticker</p>
                    </div>
                </Link>
            </button>
            <section className="mt-5 lg:p-5 lg:grid lg:grid-cols-4 lg:gap-10">
                {tickers.length ? (
                    tickers.map(tickerName => (
                        <PreviewTicker
                            key={tickerName._id}
                            tickerName={tickerName}
                        />
                    ))
                ) : <p className=" text-center text-grey-600">no hay proyectos</p>}
            </section>
        </div>
    )
}

export default Tickers