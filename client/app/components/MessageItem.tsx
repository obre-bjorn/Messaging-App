import React from 'react'
import { useAuth } from '~/contexts/AuthContext'
import type { Message } from '~/types'


interface Props {
    message : Message
}


function MessageItem({message} : Props) {

    const {user} = useAuth()

  if (user) {
    
    console.log(message.senderId, user.id )
  }

  return (
    <>  

      {user && <>
      
        {message.senderId != parseInt(user.id) ? 
            (
              <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="chat-header">
                {message.sender.username}
                <time className="text-xs opacity-50">{message.createdAt}</time>
              </div>
              <div className="chat-bubble">{message.content}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            )
          : 
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="chat-header">
                You
                <time className="text-xs opacity-50">{message.createdAt}</time>
              </div>
              <div className="chat-bubble">{message.content}</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
  
          }
        
      </>
      
      }

        

          
          
      
    
    </>
  )
}

export default MessageItem