export interface User{
    id: string
    username : string,
    email: string
}



interface GroupMember {
  id: number;
  groupId: number;
  userId: number;
  role: string;
  joinedAt: string;
}


// ^ Message types
interface GroupMessage {
  id: number;
  senderId: number;
  receiverId: number | null;
  groupId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  sender: User;
}

interface UserMessage {
  id: number;
  senderId: UserDetails
  receiverId: UserDetails
  groupId: null;
  content: string;
  createdAt: string;
  isRead: boolean;
}


interface UserDetails {

    id: number,
    username: string,
    profile_picture: string | null
}


export interface ChatDetails {
    user: UserDetails,
    lastMessage:  UserMessage

}
export interface GroupDetails {
  id: number;
  name: string;
  createdBy: number;
  createdAt: string;
  messages: GroupMessage[];
  members: GroupMember[],
}

export interface GroupWithMembership extends GroupMember {
  group: GroupDetails;
}


export interface GroupsChatsResponse {
  success?: boolean;
  msg: string;
  groups: GroupWithMembership[];
}



// ^ Response types
export interface GroupDetailResponse{
    success ?: boolean
    msg: string,
    group: GroupDetails
}


export interface UserChatsResponse {
    msg : string,
    chats : ChatDetails[]
}