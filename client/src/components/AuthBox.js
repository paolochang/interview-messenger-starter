import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/images/bg-img.png";
import { ReactComponent as ChatBubble } from "../assets/images/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#999999",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "60%",
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
    flex: "0.35",
    padding: "7rem 0",
    height: "100%",
    backgroundImage: `linear-gradient(to bottom, #3A8DFFAA, #86B9FF ),
    url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "85%",
    [theme.breakpoints.down("sm")]: {
      flex: "0",
      padding: "0",
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
  },
  actionHeader: {
    width: "90%",
    margin: "2rem 0 3rem",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  actionText: {
    margin: "2rem",
    color: "#AFAFAF",
  },
  buttonSecondary: {
    fontSize: "1em",
    width: "12rem",
    padding: "1em 0",
    color: theme.palette.primary.main,
    boxShadow:
      "0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
  },
}));

const AuthBox = ({ children, actionText, buttonText, actionRoute }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Box className={classes.container}>
        <Grid
          className={classes.image}
          container
          direction="column"
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
            <Typography className={classes.actionText}>{actionText}</Typography>
            <Button
              onClick={() => history.push(`${actionRoute}`)}
              className={classes.buttonSecondary}
            >
              {buttonText}
            </Button>
          </Grid>
          {children}
        </Grid>
      </Box>
    </Grid>
  );
};

export default AuthBox;
