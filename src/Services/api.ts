import axios from 'axios'

const api = axios.create({
    baseURL: ''
})

const viaCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

const login = axios.create({
    baseURL: process.env.REACT_APP_LOGIN_URL
})

export default {api,viaCep,login};