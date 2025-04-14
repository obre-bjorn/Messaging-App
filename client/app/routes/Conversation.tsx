import { useEffect,useState } from "react"
import { useParams } from "react-router"
import { getChatMessages } from "~/services/messageService"
import type { ChatDetails, UserMessage } from "~/types"

interface Props{

}

function Conversation({} : Props) {
  
  const {chatId} = useParams<{chatId : string | undefined}>()  
  const [loading, setLoading] = useState(false)
  const [messages,setMessages] = useState<null | UserMessage[] >(null)  


  useEffect(()=> {


    const fetchChatMessages= async () => {

      if(!chatId) return 

        setLoading(true)
        
        const data = await getChatMessages(chatId)
        setMessages(data.messages) 

        setLoading(false)


    }


    fetchChatMessages()

  },[chatId])

  console.log("Messages", messages)

  return (
        <>

        <div className="flex-1 bg--400 pb-16 md:pb-0">
                {/* Conversation content goes here */}
            <div className="h-full flex flex-col">
                  

          <div className="h-16 bg-slate-900 p-4">Chat Header</div>


          <div className="flex-1 p-4">
              <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>


          </div>
                  
                  
                  
          <div className="h-20 bg-slate-900 p-4">Input</div>

            </div>
         </div>

          
        </>
  )
}

export default Conversation