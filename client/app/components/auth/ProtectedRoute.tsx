import { Navigate } from "react-router"
import { useAuth } from "~/contexts/AuthContext"

interface ProtectedRouteProps {
    children : React.ReactNode
}


export default function ProtectedRoute({children}: ProtectedRouteProps ){

    const {isAuthenticated, loading} = useAuth()


    if(loading) {

        <div>
            <h1 className="loading">Loading...</h1>
        </div>

    }

    if(!isAuthenticated){

        <Navigate to="/login"/>
    }



    return (

        <>
            {children}
        </>
    )

}