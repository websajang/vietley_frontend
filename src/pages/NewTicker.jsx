import TickerForm from "../components/TickerForm"

const NewTicker = () => {
    return (
        <>
            <div className="p-10">
                <h1 className="text-center font-bold lg:text-start text-3xl mb-3">NEW TICKER</h1>
            </div>

            <div className="mt-10 flex justify-center">
                <TickerForm />
            </div>
        </>
    )
}

export default NewTicker