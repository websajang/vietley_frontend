import { Link } from "react-router-dom"
import useTickers from "../hooks/useTickers"
import PreviewTicker from "../components/PreviewTicker";
import useAuth from "../hooks/useAuth";

const Tickers = () => {


    const { auth } = useAuth();
    const { tickers } = useTickers();

    return (
        <div className="text-center font-bold lg:text-start lg:p-10 h-screen">

            <div className="lg:grid grid-cols-2 h-screen">
                <div className="h-3/4">
                    <h3 className="text-5xl textanimation">Manage your options easier.</h3>
                    <h3 className="text-5xl textanimation">Keep track of your gains.</h3>
                    <h3 className="text-5xl textanimation">All in one application.</h3>

                    <p className="mt-10 text-xl">WMT220724C00132000 <span className="text-green-600 font-bold">(+2756%)</span></p>
                    <p className="text-xl">WMT220824C00256000 <span className="text-green-600 font-bold">(+32658%)</span></p>
                </div>
                <div>
                    <section className="p-5 mx-5 border-2 border-slate-300 rounded-xl lg:gap-10 h-5/6">
                        <h2 className="text-center text-3xl">Tickers</h2>
                        <div className="flex flex-row justify-between border-b-2 border-slate-300">
                            <h3 className="mt-5">Name: {auth.name}</h3>
                            <h3 className="mt-5 pb-5">Email: {auth.email}</h3>
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