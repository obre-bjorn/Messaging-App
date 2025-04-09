import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { useAuth } from "~/contexts/AuthContext";
import { getChats } from "~/services/messageService";
import { type ChatDetails } from "../types/index"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  
  const {user} = useAuth()
  const [loading, setLoading] = useState<Boolean>(false)
  const [chats, setChats] = useState<null | ChatDetails[]>(null)

  useEffect(()=> {

    const fetchChats = async() => {

      setLoading(true)
      const data = await getChats()
      setChats(data.chats)

      setLoading(false)

    }

    fetchChats()
    
  },[])


  console.log("Is loading",loading)
  console.log("Chats", chats)

  return ( <>
          
          <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Mobile Bottom Menu - Shows only on small screens */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-amber-400 flex justify-around items-center">
              <button className="p-2">💬 Chats</button>
              <button className="p-2">👥 Contacts</button>
              <button className="p-2">⚙️ Settings</button>
            </div>

            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="hidden md:block w-20 bg-slate-700">
              Menu

              <FontAwesomeIcon icon="fa-solid fa-user" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row h-full md:h-auto">
              {/* Chat List - Hidden on mobile when not active */}
              <div className="hidden md:block w-80 bg-slate-800">
                Chats List
              </div>

              {/* Conversation Area - Always visible */}
              <div className="flex-1 bg--400 pb-16 md:pb-0">
                {/* Conversation content goes here */}
                <div className="h-full flex flex-col">
                  <div className="h-16 bg-slate-900 p-4">Chat Header</div>
                  <div className="flex-1 p-4">Messages</div>
                  <div className="h-20 bg-slate-900 p-4">Input</div>
                </div>
              </div>
            </div>
          </div>
          {/* <h1>
            Welcome : {user && user.username}
          </h1>
          {loading && <div className="loading"></div>}
          
          {chats && chats.map((chat)=> {
            
            return (<div key ={chat.user.id}>
              <h1>{chat.user.username}</h1>
              <h3>{chat.lastMessage.content}</h3>
            </div>)


          })} */}

  </>)
}
