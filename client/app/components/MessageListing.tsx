import React from 'react'
import MessageItem from './MessageItem'
import type { Message } from '~/types'


interface Props {
  messages : Message[]
}

function MessageListing({messages} : Props ) {

  return (

    
      <>
      
        {/* {Messages} */}
        {messages.map(message => <MessageItem key={message.id}  message={message}/>)}
    
      </>
  )
  
}

export default MessageListing