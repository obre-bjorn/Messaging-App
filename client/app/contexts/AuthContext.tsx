import {createContext, useState,useEffect, useContext,type ReactNode } from 'react'
import { useNavigate } from 'react-router'


type User = { 
    id : string,
    username : string,
    bio: null | string,
    
}


type AuthContextType = {
    user : User | null,
    loading : boolean,
    isAuthenticated : boolean
    login: (username: string, password : string) => Promise<void>,
    register: (username: string, email: string, password:  string) => Promise<void>
    logout: () => void

}



const AuthContext = createContext<AuthContextType | undefined>(undefined)


export function AuthProvider (children : ReactNode){

    const [user, setUser] = useState< User | null>(null) 
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

}



