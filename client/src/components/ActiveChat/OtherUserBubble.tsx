import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import { ImageBubble, LinkBubble } from ".";
import { useLinkFinder } from "../../hooks/useLinkFinder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
    },
    mixContainer: {
      margin: "5px 0",
      maxWidth: "30rem",
    },
    imageRow: {
      justifyContent: "flex-start",
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
      width: "fit-content",
      overflowWrap: "anywhere",
    },
    text: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#FFFFFF",
      letterSpacing: -0.2,
      padding: 8,
    },
  })
);

interface Props {
  text: string;
  time: string;
  otherUser: any;
  attachments: string[];
  mine: boolean;
}

const OtherUserBubble: React.FC<Props> = ({
  text,
  time,
  otherUser,
  attachments,
  mine,
}) => {
  const classes = useStyles();

  const link = useLinkFinder(text);

  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
      <Box className={classes.mixContainer}>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        {attachments !== null && text !== "Sent photo" && (
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        )}
        {attachments !== null ? (
          <>
            {attachments.length === 1 ? (
              <ImageBubble attachment={attachments[0]} mine={mine} />
            ) : (
              <Grid container className={classes.imageRow}>
                {attachments.map((attachment, index) => (
                  <ImageBubble
                    key={index}
                    attachment={attachment}
                    mine={mine}
                    size={"sm"}
                  />
                ))}
              </Grid>
            )}
          </>
        ) : null}
        {link && <LinkBubble mine={mine} url={link[0]} />}
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
