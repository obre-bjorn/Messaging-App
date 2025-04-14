import { useState,useEffect } from "react"

import { type ChatDetails } from "~/types"
import { getChats } from "~/services/messageService"
import ChatListing from "../components/ChatListing"
import { Outlet} from "react-router"


function Chats() {
const [loading, setLoading] = useState<Boolean>(false)
const [chats, setChats] = useState<null | ChatDetails[]>(null)
const [activeChat, setActiveChat ] = useState <null | number>(null)

    useEffect(()=> {

        const fetchChats = async() => {

        setLoading(true)
        const data = await getChats()
        setChats(data.chats)

        setLoading(false)

        }

        fetchChats()
        
    },[])



    return (

        <>

            <div className="hidden md:block w-100 bg-slate-800 font-bold text-2xl p-3">
            
                <div className="m-4 border-b-2">Chats</div>

                {loading && <div className="loading"></div>}

                {chats && <ChatListing chats={chats}/> } 

            </div>


            <Outlet/>
        </>

    )
}

export default Chats