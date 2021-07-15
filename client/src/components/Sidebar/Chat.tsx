import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from ".";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { IConversation } from "../../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 8,
      height: 80,
      boxShadow: "0 2px 10px 0 rgba(88,133,196,0.2)",
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      "&:hover": {
        cursor: "grab",
      },
    },
  })
);

interface Props {
  conversation: IConversation;
  setActiveChat: any;
}
const Chat: React.FC<Props> = ({ conversation, setActiveChat }) => {
  const classes = useStyles();

  const handleClick = async (conversation: IConversation) => {
    await setActiveChat(conversation.otherUser.username);
  };

  const otherUser = conversation.otherUser;
  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setActiveChat: (id: number) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
