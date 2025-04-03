import api from "./api";
import type { User } from "~/types";



interface AuthResponse {
    token: string,
    user : User
}


export const login  = async (username: string, password : string): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>('/login', {username,password}) 
    return response.data

}


export const register  = async (email : string ,username: string, password : string): Promise<AuthResponse> => {

    const response = await api.post('/register', {email,username,password}) 
    return response.data

}

export const validateToken = async (token : string | null) : Promise<AuthResponse> => {

    const response = await api.get<AuthResponse>('/validate',{
        headers : {
            Authorization : token
        }
    })
    
    return response.data

}

