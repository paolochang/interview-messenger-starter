import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import ImageBubble from "./ImageBubble";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  mixContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  imageRow: {
    marginRight: "7px",
  },
  date: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "15px",
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    margin: "5px 15px 5px 5px",
  },
  bubbleWithSingle: {
    background: "#F4F6FA",
    borderRadius: "0 0 0 10px",
    margin: "0px 15px 5px 5px",
  },
  bubbleWithMulti: {
    background: "#F4F6FA",
    borderRadius: "0 0 0 10px",
    margin: "0px 15px 5px 5px",
  },
  avatar: {
    display: "flex",
    justifySelf: "flex-end",
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, user, attachments, mine } = props;

  return (
    <Box className={classes.root}>
      {attachments.length > 1 ? (
        <div className={classes.mixContainer}>
          <Box className={classes.bubbleWithSingle}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
          <Grid container className={classes.imageRow}>
            {attachments.map((attachment) => (
              <ImageBubble mine={mine} attachment={attachment} size={"sm"} />
            ))}
          </Grid>
          <Typography className={classes.date}>{time}</Typography>
          <Avatar
            alt={user.username}
            src={user.photoUrl}
            className={classes.avatar}
          />
        </div>
      ) : attachments.length === 1 ? (
        <div className={classes.mixContainer}>
          <Typography className={classes.date}>{time}</Typography>
          <Grid container className={classes.imageRow}>
            <ImageBubble mine={mine} />
          </Grid>
          {text !== "Sent photo" && (
            <Box className={classes.bubbleWithSingle}>
              <Typography className={classes.text}>{text}</Typography>
            </Box>
          )}
          <Avatar
            alt={user.username}
            src={user.photoUrl}
            className={classes.avatar}
          />
        </div>
      ) : (
        <div className={classes.mixContainer}>
          <Typography className={classes.date}>{time}</Typography>
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default SenderBubble;
