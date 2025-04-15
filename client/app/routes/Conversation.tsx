import { useEffect,useState } from "react"
import { useParams } from "react-router"
import MessageListing from "~/components/MessageListing"
import SendTextForm from "~/components/SendTextForm"
import { useAuth } from "~/contexts/AuthContext"
import { getChatMessages } from "~/services/messageService"
import { type UserDetails, type Message } from "~/types"

interface Props{

}

function Conversation({} : Props) {
  
  const {user} = useAuth()
  const {chatId} = useParams<{chatId : string | undefined}>()  
  const [loading, setLoading] = useState(false)
  const [friend, setFriend] = useState<null| UserDetails>(null)
  const [messages,setMessages] = useState<[] | Message[] >([])  


  useEffect(()=> {


    const fetchChatMessages= async () => {

      if(!chatId) return 

        setLoading(true)
        
        const data = await getChatMessages(chatId)
        setMessages(data.messages) 
        setFriend(data.friend)
        setLoading(false)


    }


    fetchChatMessages()

  },[chatId])


  const addMessage = (message: Message) => {
    
    setMessages(prevMessages => [...prevMessages,message])


  }

  console.log("Messages", messages)

  return (
        <>

        <div className="flex-1 bg--400 pb-16 md:pb-0">
                {/* Conversation content goes here */}
            <div className="h-full flex flex-col">
                  

          <div className="h-16 flex items-center gap-2 bg-slate-900 p-4 capitalize">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
            <div className="font-bold">
              {friend?.username}
            </div>
          </div>
          <div className="flex-1 p-4">

            {loading && <div className="loading "></div>}
            {messages && <MessageListing messages={messages}/> }

          </div>
                  
                  
                  
          <div id="form_container" className="h-20 bg-slate-900 p-4 w-full">
              <SendTextForm appendMessageUI={addMessage} friendId= {chatId}/>
          </div>



          </div>
        </div>  
        </>
  )
}


export default Conversation