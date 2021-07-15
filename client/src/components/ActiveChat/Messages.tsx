import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from ".";
import moment from "moment";
import { IUser } from "../../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chatbox: {
      overflow: "scroll",
      maxHeight: "66rem",
    },
  })
);

interface Props {
  btmRef: any;
  scrollToBottom: any;
  messages: any;
  otherUser: any;
  user: IUser;
}

const Messages: React.FC<Props> = ({
  btmRef,
  scrollToBottom,
  messages,
  otherUser,
  user,
}) => {
  const classes = useStyles();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
      <div ref={btmRef} />
    </Box>
  );
};

export default Messages;
