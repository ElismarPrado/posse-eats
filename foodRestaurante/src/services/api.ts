import axios from 'axios'

const api = axios.create({
    baseURL: 'http://3.23.146.65:3333'
})

export default api
