import {createContext, useState,useEffect, useContext,type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import {login as apiLogin, register as apiRegister, validateToken} from '../services/authService'


type User = { 
    id : string,
    username : string,
    email: string,
    bio?: null | string,
    
}


type AuthContextType = {
    user : User | null;
    loading : boolean;
    isAuthenticated : boolean;
    login: (username: string, password : string) => Promise<void>;
    register: (username: string, email: string, password:  string) => Promise<void>;
    logout: () => void;

}
interface AuthProviderProps {
    children: ReactNode;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)


export function AuthProvider ({children} : AuthProviderProps){

    const [user, setUser] = useState<User|null>(null) 
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {

        const checkAuthStatus = async () => {

            console.log("LOading", loading)
            const token: string | null = localStorage.getItem('token')

            if(token == null){
                setLoading(false)
                return
                
            }


            try {

                const {user} = await validateToken(token)
                console.log("fetching User: ",user)

                if(user){
                    
                    setUser(user)
                    
                }
               
                return

                
            } catch (error) {
                
                localStorage.removeItem('token')
                
            }finally { 

                setLoading(false)

            }

        }

        checkAuthStatus()

    },[])

    console.log("Rendered Context")

    const login = async ( username: string, password: string) : Promise<void> =>{
        
        setLoading(true)

        try {
        
            const {token, user} = await apiLogin(username,password)
            localStorage.setItem('token', token)
            setUser(user)
            navigate('/')


        }catch (error) {
            
            throw new Error('Something went wrong')
        }
        finally{
            setLoading(false)
        }
    }


    const logout = () : void => {
        
        localStorage.removeItem('token')
        setUser(null)
        navigate('/login')

    }



    const register = async (username: string, email : string, password: string) : Promise<void>=> {


        setLoading(true)

        try {

            const {user , token} = await apiRegister(email,username,password)
            localStorage.setItem('token',token)
            setUser(user)
            navigate('/')

            
        } catch (error) {
            
            throw new Error('Failed to login')

        }finally{

            setLoading(false)

        }  

    }
    

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated : !!user,
        login,
        logout,
        register,
    }



    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>
    )
    

}


export function useAuth () { 

    const context = useContext(AuthContext)

    if(context == undefined){

        throw new Error('useAuth must be used within an AuthProvider')

    }

    return context
}



// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJvYnJlIiwiaWF0IjoxNzQzODczMzc5LCJleHAiOjE3NDM5MDIxNzl9.h7R41Sne07nktBTcyyHXr_Mxvf-v5-aGPPuVigvMqo0