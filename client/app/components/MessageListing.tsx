import React from 'react'
import MessageItem from './MessageItem'
import type { Message } from '~/types'


interface Props {
  messages : Message[]
}

function MessageListing({messages} : Props ) {

  return (

    <div className="flex-1 p-4">
              {/* {Messages} */}
              {messages.map(message => <MessageItem key={message.id}  message={message}/>)}
          </div>
    
  )
  
}

export default MessageListing