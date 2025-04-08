import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "~/contexts/AuthContext"



export default function Login() {
    
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const {isAuthenticated,login,loading} = useAuth()

    console.log("RENDERED")
    useEffect(()=> {


        if(isAuthenticated){

            navigate('/',{replace: true})

        }

    },[isAuthenticated])


    const handleSubmit = async(e : React.FormEvent) => {

        console.log(username, password)

        e.preventDefault()
        setIsSubmitting(true)
        setError('')
        
        console.log("Loading: ",loading)

        try {
            await login(username,password)

            
        } catch (error) {
            
            console.log(error)
            setError("Failed to login! Check your credentials.")
        }
        finally{
            setIsSubmitting(false)
        }
    }


    
    if (isAuthenticated) {
        
        return <div className="loading"></div>
        
        
        null; // Or <LoadingSpinner />
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col w-full ">

                {isSubmitting && <div className="loading"></div>}

                <form className="card lg:p-5 bg-base-100 w-full max-w-md shrink-0 shadow-2xl" onSubmit={handleSubmit}>


                    {error && <h1 className="text-warning">{error}</h1>}
                    
                    <div className="text-center lg:text-left min-w-60 ">
                        <h1 className="text-5xl pb-4 text-center">Let's Chat</h1>
                        <h1 className="text-5xl pb-4 text-center">👥</h1>
                    </div>
                    <div className="card-body">
                        <fieldset className="fieldset">

                                <label className="fieldset-label">Username</label>
                                <input 
                                    type="text" 
                                    className="input w-full" 
                                    placeholder="Username"
                                    value= {username}
                                    onChange={ (e) => setUsername(e.target.value)} 
                                />

                                <label className="fieldset-label">Password</label>

                                <input 
                                    type="password" 
                                    className="input w-full" 
                                    placeholder="Password"
                                    value= {password}
                                    onChange={ (e) => setPassword(e.target.value)} 
                                />

                                <div className="mt-3 flex justify-between">
                                    <a className="link link-hover">Forgot password?</a>
                                    <a className="link link-hover" href="/register">Register</a>
                                </div>
                                

                                <button className="btn btn-primary mt-4 font-bold">Login</button>
                        </fieldset>
                    </div>    
                </form>       

                    <button className="btn btn-neutral mt-4 font-bold">Login as Guest</button>   
            </div>
        </div>
    )
}
