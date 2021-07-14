import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: 21,
      paddingRight: 21,
      flexGrow: 1,
      maxWidth: "25%",
      overflow: "hidden",
    },
    title: {
      fontSize: 20,
      letterSpacing: -0.29,
      fontWeight: "bold",
      marginTop: 32,
      marginBottom: 15,
    },
  })
);

interface Props {
  conversations: any;
  handleChange: any;
  searchTerm: any;
}

const Sidebar: React.FC<Props> = ({
  conversations: convo,
  handleChange,
  searchTerm,
}) => {
  const classes = useStyles();
  const conversations = convo || [];

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation: any) =>
          conversation.otherUser.username.includes(searchTerm)
        )
        .map((conversation: any) => {
          return (
            <Chat
              conversation={conversation}
              key={conversation.otherUser.username}
            />
          );
        })}
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    conversations: state.conversations,
  };
};

export default connect(mapStateToProps)(Sidebar);
