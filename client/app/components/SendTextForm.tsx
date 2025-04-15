import React, { useState } from 'react'

import {type Message } from '~/types';
import { sendMessage as apiSendMessage } from '~/services/messageService'


interface Props{ 
    friendId : string | undefined, 
    appendMessageUI: (message: Message) => void;
}

async function handleSendText (friendId: string, message: string, appendMessage: (message: Message) => void) {

    const messageResponse = await apiSendMessage(message, friendId)

    appendMessage(messageResponse.message)

}


async function handleMessageInputChange (e) {

    



}





function SendTextForm({appendMessageUI,friendId} : Props) {

    const [message,setMessages] = useState("");


    return (
        <form className='flex gap-2' onSubmit={( ) => handleSendText(friendId, message, appendMessage = appendMessageUI)}>
            <div id="messageInput" className="flex-[80]">
                <input type="text" placeholder="neutral" className="input input-neutral w-full"onChange={handleMessageInputChange}/>
            </div>
            <div id="button-container flex-[10] flex gap-2">
                <button className="btn btn-active btn-primary rounded-full">Send</button>
            </div>
        </form>
    )
}

export default SendTextForm