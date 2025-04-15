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

export interface UserMessage {
  id: number;
  senderId: UserDetails
  receiverId: UserDetails
  groupId: null;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Message{

  id: number;
  senderId: number;
  receiverId: number
  groupId: null;
  content: string;
  createdAt: string;
  isRead: boolean;
  sender : UserDetails,
  reciever: UserDetails

}

export interface UserDetails {

    id: number,
    username: string,
    profile_picture: string | null,
    lastseen: string
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


// Response types
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


export interface ChatMessagesResponse{
  msg: string,
  friend: UserDetails
  messages: Message[]
  
}

export interface MessageResponse {
  success: string,
  msg : string,
  message: Message,

}
