import { useState,useEffect } from "react"

import { type ChatDetails } from "~/types"
import { getChats } from "~/services/messageService"
import ChatListing from "../components/ChatListing"


function Chats() {
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



    return (

        <>
            <h1>Chats</h1>

            {loading && <div className="loading"></div>}

            {chats && <ChatListing chats={chats}/> } 
        </>

    )
}

export default Chats