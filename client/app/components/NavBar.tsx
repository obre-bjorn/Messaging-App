
import { NavLink } from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {fas} from "@fortawesome/free-solid-svg-icons"
import { library, type IconProp } from "@fortawesome/fontawesome-svg-core";


library.add(fas)

function NavBar() {

    
  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-amber-400 flex justify-around items-center">
        <button className="p-2">💬 Chats</button>
        <button className="p-2">👥 Contacts</button>
        <button className="p-2">⚙️ Settings</button>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden  md:flex flex-col justify-between items-center py-3 w-20 bg-slate-700">

        <div className="Logo ">Chat App</div>

        <div id="navigations" className="flex flex-col justify-between items-center w-full">

          <NavLink to="/chats" className=" py-6 text-center hover:bg-accent w-full">
            <FontAwesomeIcon icon={"fa-solid fa-message" as IconProp} className="text-2xl "/>
          </NavLink>    

          <NavLink to="groups" className=" py-6 text-center hover:bg-accent w-full">

            <FontAwesomeIcon icon={"fa-solid fa-user-group" as IconProp} className="text-2xl"/>
          </NavLink>


          <NavLink to="/profile" className=" py-6 text-center hover:bg-accent w-full">
            
            <FontAwesomeIcon icon={"fa-solid fa-user-plus" as IconProp} className="text-2xl"/>
          </NavLink>
        </div>

        <div id="profile" className="">
          <FontAwesomeIcon icon={"fa-solid fa-user" as IconProp} />
        </div>

      </div>
    </>
  )
}

export default NavBar