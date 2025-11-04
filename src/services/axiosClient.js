import axios from 'axios'

const BASE_URL = 'https://picsum.photos'

const axiosClient = axios.create({
    baseURL: BASE_URL,
})

export default axiosClient
