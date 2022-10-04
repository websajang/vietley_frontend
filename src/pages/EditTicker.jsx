import useTickers from "../hooks/useTickers"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import TickerForm from "../components/TickerForm"

const EditTicker = () => {

    const params = useParams()
    const { getTicker, ticker, loading } = useTickers()

    useEffect(() => {
        getTicker(params.id)
    }, [])

    if (loading) return 'Loading...'

    return (
        <div>
            <h1>Editing: {ticker.ticker}</h1>

            <div className="mt-10 flex justify-center">
                <TickerForm />
            </div>
        </div>
    )
}

export default EditTicker