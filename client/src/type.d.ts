export interface IUser {
  id: number;
  username: string;
  email: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
  error: string;
  isFetching: boolean;
  isFetchingUser: boolean;
}

interface IOtherUser {
  id: number;
  username: string;
  photoUrl: string;
  online: boolean;
}

export interface IConversation {
  id: number;
  messages: any;
  user1: any;
  otherUser: IOtherUser;
  latestMessageText: string;
}

export interface IMessage {
  id: number;
  conversationId: number;
  senderId: number;
  text: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}
