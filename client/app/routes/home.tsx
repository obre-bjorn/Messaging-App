import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { useAuth } from "~/contexts/AuthContext";
import { getChats } from "~/services/messageService";
import { type ChatDetails } from "../types/index"

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
          <h1>
            Welcome : {user && user.username}
          </h1>
          {loading && <div className="loading"></div>}
          
          {chats && chats.map((chat)=> {
            
            return (<div key ={chat.user.id}>
              <h1>{chat.user.username}</h1>
              <h3>{chat.lastMessage.content}</h3>
            </div>)


          })}

  </>)
}
