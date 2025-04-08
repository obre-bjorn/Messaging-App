import api from "./api";
import type { UserChatsResponse } from "~/types";


export const getChats = async (): Promise <UserChatsResponse> => {


    try {  

        const response = await api.get<UserChatsResponse>('/get_conversations')
        return response.data

    } catch (error) {

        throw new Error("Failed to get Chats")

    }

}


