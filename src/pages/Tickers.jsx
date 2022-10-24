import { Link } from "react-router-dom"
import useTickers from "../hooks/useTickers"
import PreviewTicker from "../components/PreviewTicker";
import useAuth from "../hooks/useAuth";

const Tickers = () => {


    const { auth } = useAuth();
    const { tickers } = useTickers();

    return (
        <div className="text-center font-bold lg:text-start lg:p-10">

            <div className="lg:grid grid-cols-2">
                <section className="p-5 lg:mx-5 lg:gap-10">
                    <div className="bg-black text-white rounded-xl p-5">
                        <h3 className="text-3xl text-center">ACCOUNT</h3>
                    </div>
                    <p className="mt-5">Name: {auth.name}</p>
                    <p className="mt-5 pb-5">Email: {auth.email}</p>
                </section>
                <div>
                    <section className="p-5 lg:mx-5 lg:gap-10">
                        <div className="bg-black text-white rounded-xl p-5">
                            <h3 className="text-3xl text-center">TICKERS</h3>
                        </div>
                        {tickers.length ? (
                            tickers.map(tickerName => (
                                <PreviewTicker
                                    key={tickerName._id}
                                    tickerName={tickerName}
                                />
                            ))
                        ) : ''}
                        {/** New Ticker button **/}
                        <button className="mt-5">
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
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Tickers