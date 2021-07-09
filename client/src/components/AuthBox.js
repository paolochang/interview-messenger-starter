import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/images/bg-img.png";
import { ReactComponent as ChatBubble } from "../assets/images/bubble.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      height: "100%",
    },
    "@media (max-height: 900px)": {
      maxHeight: "900px",
      minHeight: "900px",
    },
  },
  image: {
    display: "flex",
    flexDirection: "column",
    flex: "0.35",
    height: "50rem",
    backgroundImage: `linear-gradient(to bottom, #3A8DFFAA, #86B9FF ),
    url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "85%",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      flex: "0",
      padding: "0",
      height: "0",
      overflow: "hidden",
    },
  },
  overlayIcon: {
    color: "#FFFFFF",
    fontWeight: "300",
    fontSize: "5.5rem",
    marginBottom: "2rem",
  },
  overlayText: {
    color: "#FFFFFF",
    fontSize: "1.8em",
    textAlign: "center",
    marginBottom: "8rem",
  },
  base: {
    flex: "0.65",
    height: "50rem",
  },
  actionHeader: {
    display: "flex",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  actionContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  actionText: {
    margin: "2rem",
    color: "#AFAFAF",
  },
  buttonSecondary: {
    fontSize: "1em",
    width: "12rem",
    height: "4rem",
    color: theme.palette.primary.main,
    boxShadow:
      "0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    alignSlef: "center",
    alignItems: "center",
    height: "50rem",
  },
}));

const AuthBox = ({ children, actionText, buttonText, actionRoute }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        container
        className={classes.image}
        containerdirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <ChatBubble className={classes.overlayIcon} />
        <Typography className={classes.overlayText}>
          Converse with anyone
          <br /> with any language
        </Typography>
      </Grid>
      <Grid
        className={classes.base}
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid
          className={classes.actionHeader}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid container className={classes.actionContainer}>
            <Typography className={classes.actionText}>{actionText}</Typography>
            <Button
              onClick={() => history.push(`${actionRoute}`)}
              className={classes.buttonSecondary}
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.content}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthBox;
