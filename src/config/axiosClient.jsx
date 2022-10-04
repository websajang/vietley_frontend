import axios from 'axios'

/** useing axiosClient or any other variable name, instead of axios, will make that calling axiosClient.post() for example set the beggining of the url with VITE_BACKEND_ULR/api **/

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default axiosClient