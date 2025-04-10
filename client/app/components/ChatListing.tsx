import { type ChatDetails } from "~/types"


interface Props {
  chats: ChatDetails[]
}

function ChatListing({chats} : Props) {


  
  return (

    <div>
      {chats && chats.map((chat)=> {
            
            return (<div key ={chat.user.id}>
              <h1>{chat.user.username}</h1>
              <h3>{chat.lastMessage.content}</h3>
            </div>)
          })}

    </div>
  )
}

export default ChatListing