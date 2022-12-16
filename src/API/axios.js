import axios from "axios"

// const BASE_URL = `http://192.168.0.171:5500/api`
const BASE_URL = `https://api.hostynnist.com:5503/api`
// const token = localStorage.getItem('accessToken')

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*', //
        'Content-Type': 'application/json'
    }
})