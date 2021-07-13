import React, { useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  chatbox: {
    overflow: "scroll",
    maxHeight: "66rem",
  },
}));

const Messages = (props) => {
  const { messages, otherUser, user } = props;
  const classes = useStyles(props);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box className={classes.chatbox}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        console.log(message);
        return message.senderId === user.id ? (
          <SenderBubble
            key={message.id}
            user={user}
            time={time}
            text={message.text}
            attachments={message.attachments}
            mine={message.senderId === user.id}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            attachments={message.attachments}
            mine={message.senderId === user.id}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default Messages;
