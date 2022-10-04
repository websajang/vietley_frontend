import { useContext } from 'react'
import TickersContext from '../context/TickersProvider'


const useTickers = () => {
    return useContext(TickersContext)
}

export default useTickers;