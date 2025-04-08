import { useNavigate, Outlet } from "react-router"
import { useAuth } from "~/contexts/AuthContext"
import { useEffect } from "react"

interface ProtectedRouteProps {
    children : React.ReactNode
}


export default function ProtectedRoute({children}: ProtectedRouteProps ){
    const navigate = useNavigate()
    const {isAuthenticated, loading} = useAuth()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [loading, isAuthenticated, navigate]);



    if (loading) {
        return <div className="loading-bars"> </div>// or return a loading spinner
    }

    if (!isAuthenticated) {
        return null; // while redirect happens
    }

    return <div>
    <Outlet/>
    </div>;

}