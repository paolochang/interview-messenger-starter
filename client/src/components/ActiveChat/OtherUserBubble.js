import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import { ImageBubble, LinkBubble } from "../ActiveChat";
import { useLinkFinder } from "../../hooks/useLinkFinder";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
  },
  subroot: {
    display: "flex",
    flexDirection: "column",
  },
  mixContainer: {
    margin: "5px 0",
    maxWidth: "30rem",
    width: "auto",
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
  },
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments, mine } = props;

  const link = useLinkFinder(text);

  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
      <Box className={classes.subroot}>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        {text !== "Sent photo" && attachments.length > 0 && (
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        )}
        {attachments.length > 1 ? (
          <div className={classes.mixContainer}>
            <Grid container>
              {attachments.map((attachment, index) => (
                <ImageBubble
                  key={index}
                  attachment={attachment}
                  mine={mine}
                  size={"sm"}
                />
              ))}
            </Grid>
          </div>
        ) : attachments.length === 1 ? (
          <div className={classes.mixContainer}>
            <ImageBubble attachment={attachments} mine={mine} />
          </div>
        ) : (
          <div className={classes.mixContainer}>
            <Box className={classes.bubble}>
              <Typography className={classes.text}>{text}</Typography>
            </Box>
          </div>
        )}
        {link && <LinkBubble mine={mine} url={link[0]} />}
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
