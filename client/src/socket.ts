import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { setNewAttachments } from "./store/attachments";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id: number) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id: number) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data: any) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on("new-attachments", (data: any) => {
    store.dispatch(setNewAttachments(data.attachments, data.sender));
  });
});

export default socket;
