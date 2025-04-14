import { type ChatDetails } from "~/types"
import Chat from "./Chat"


interface Props {
  chats: ChatDetails[]
}

function ChatListing({chats} : Props) {


  
  return (

    <>
    
      <ul className="list bg-base-100 rounded-box shadow-md">
    
        {chats && chats.map(chat => <Chat key={chat.user.id} chat={chat}/>)

        }
    
      </ul>
    
    </>
  )
}

export default ChatListing