import { type ChatDetails } from "~/types"
import Chat from "./Chat"


interface Props {
  chats: ChatDetails[]
}

function ChatListing({chats} : Props) {


  
  return (

    // <div>
    //   {chats && chats.map((chat)=> {
            
    //         return (<div key ={chat.user.id}>
    //           <h1>{chat.user.username}</h1>
    //           <h3>{chat.lastMessage.content}</h3>
    //         </div>)
    //       })}

    // </div>

    <ul className="list bg-base-100 rounded-box shadow-md">
  
      {chats && chats.map(chat => <Chat key={chat.user.id} chat={chat}/>)

      }
  
    </ul>
  )
}

export default ChatListing