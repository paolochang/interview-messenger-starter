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
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
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

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default Messages;
