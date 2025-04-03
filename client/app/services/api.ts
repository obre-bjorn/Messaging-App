import axios from "axios"

const api = axios.create({
    //! set process.env.REACT_APP_API_URL || 
    baseURL :  'http://localhost:5000',
    headers : {
        'Content-Type' : 'application/json'
    }
})


api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token')

    if(token) {
        config.headers.Authorization = token
    }

    return config
})


api.interceptors.response.use(
    (response) => response, 
    async (error) => {

        if(error.response?.status === 401){
            localStorage.removeItem('token')
            window.location.href = ('/login')

        }

        return Promise.reject(error)
    }

)

export default api;