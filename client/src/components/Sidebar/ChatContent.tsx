import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IConversation } from "../../type";

interface styleProps {
  windowWidth: number;
}

const useStyles = makeStyles<Theme, styleProps>((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: 20,
      flexGrow: 1,
      width: "80%",
    },
    container: { width: "inherit" },
    username: {
      fontWeight: "bold",
      letterSpacing: -0.2,
    },
    previewText: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      maxWidth: "inherit",
      fontSize: 12,
      color: "#9CADC8",
      letterSpacing: -0.17,
    },
    notification: {
      height: 20,
      width: 20,
      backgroundColor: "#3F92FF",
      marginRight: 10,
      color: "white",
      fontSize: 10,
      letterSpacing: -0.5,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
  })
);

interface Props {
  conversation: IConversation;
}

const ChatContent: React.FC<Props> = ({ conversation }) => {
  const styleProps = { windowWidth: window.innerWidth };
  const classes = useStyles(styleProps);

  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
