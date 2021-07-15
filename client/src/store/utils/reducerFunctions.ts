import { IConversation, IMessage, IUser } from "../../type";

export const addConversationsToStore = (state: any, payload: any) => {
  const { conversations } = payload;
  return conversations.map((convo: IConversation) => {
    return {
      ...convo,
      messages: convo.messages.reverse(),
    };
  });
};

interface IAddMessage {
  message: IMessage;
  sender: any;
}

export const addMessageToStore = (state: any, payload: IAddMessage) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      latestMessageText: "",
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo: IConversation) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

interface IAttachmentsPayload {
  attachments: string[];
}

export const holdAttachmentsToStore = (
  state: any,
  payload: IAttachmentsPayload
) => {
  const { attachments } = payload;
  return attachments;
};

export const addOnlineUserToStore = (state: any, id: number) => {
  return state.map((convo: IConversation) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state: any, id: number) => {
  return state.map((convo: IConversation) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state: any, users: IUser[]) => {
  const currentUsers: any = {};

  // make table of current users so we can lookup faster
  state.forEach((convo: IConversation) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user: any) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (
  state: any,
  recipientId: number,
  message: IMessage
) => {
  return state.map((convo: IConversation) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
