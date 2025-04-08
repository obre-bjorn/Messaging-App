import api from "./api";
import type { User, GroupsChatsResponse, GroupDetailResponse } from "~/types";



export const getGroupChats = async (): Promise<GroupsChatsResponse> => {

    try {

        const response = await api.get<GroupsChatsResponse>('/my_groups')
        return response.data

    } catch (error) {
        
        throw new Error("Failed to get Group Chats")

    }
}

export const createGroup = async (groupName: string): Promise<GroupDetailResponse> => {

    try {

        const response = await api.post<GroupDetailResponse>('/create_group',{groupName})
        return response.data

    } catch (error) {
        
        throw new Error("Failed to create group")

    }

}