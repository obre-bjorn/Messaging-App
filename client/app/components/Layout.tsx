import { Outlet } from "react-router"
import NavBar from "../components/NavBar"

function Layout() {


  return (
     <div className="flex flex-col md:flex-row h-screen w-full">

        <NavBar/>

        <div className="hidden md:block w-100 bg-slate-800 font-bold text-2xl p-3">
            <Outlet/>
        </div>


     </div>
  )
}

export default Layout