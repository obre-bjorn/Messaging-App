import api from "./api";
import type {  ChatMessagesResponse,  UserChatsResponse,  MessageResponse } from "~/types";


export const getChats = async (): Promise <UserChatsResponse> => {


    try {  

        const response = await api.get<UserChatsResponse>('/get_conversations')
        return response.data

    } catch (error) {

        throw new Error("Failed to get Chats")

    }

}


export const getChatMessages = async (chatId:string): Promise <ChatMessagesResponse> => {

    try {
        
        const response = await api.get<ChatMessagesResponse>(`/messages/${chatId}`)
        return response.data

    } catch (error) {
        
        throw new Error("Failed to get chat messages")

    }


}


export const sendMessage = async (message: string, friendId : string):  Promise <MessageResponse> => { 


    try {
        
        const response = await api.post<MessageResponse>(`send_message`,{
            friendId: friendId,
            message : message,
        } )

        return response.data


    } catch (error) {
        
        throw new Error("Failed to send message")

    }

}
