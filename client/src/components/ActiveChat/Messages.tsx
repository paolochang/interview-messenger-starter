import React, { useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from ".";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chatbox: {
      overflow: "scroll",
      maxHeight: "66rem",
    },
  })
);

interface Props {
  messages: any;
  otherUser: any;
  user: any;
}

const Messages: React.FC<Props> = ({ messages, otherUser, user }) => {
  const classes = useStyles();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box className={classes.chatbox}>
      {messages.map((message: any) => {
        const time = moment(message.createdAt).format("h:mm");
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
