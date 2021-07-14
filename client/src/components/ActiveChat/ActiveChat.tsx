import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import MetaDecorator from "../../utils/MetaDecorator";
import { IConversation } from "../../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 8,
      flexDirection: "column",
    },
    chatContainer: {
      marginLeft: 41,
      marginRight: 41,
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "space-between",
    },
  })
);

interface Props {
  user?: any;
  conversation?: any;
}

const ActiveChat: React.FC<Props> = ({ user, conversation: convo }) => {
  const classes = useStyles();
  const conversation = convo || {};

  return (
    <Box className={classes.root}>
      <MetaDecorator
        title={
          conversation.otherUser?.username
            ? conversation.otherUser?.username
            : "Home"
        }
        description="Let's chat with anyone with any language"
      />
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              user={user}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              // user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation: IConversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
