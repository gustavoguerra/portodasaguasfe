import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    //baseURL: 'https://localhost:5001/api',
    headers: {
        common: {
            Authorization: localStorage.getItem('TOKEN')
        }
    }
})

const viaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

const login = axios.create({
    baseURL: process.env.REACT_APP_LOGIN_URL   
    //baseURL: 'https://userlogin-api.herokuapp.com/'
})

export default { api, viaCep, login };