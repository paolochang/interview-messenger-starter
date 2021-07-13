import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { path } from "../routes";
import AuthBox from "../components/AuthBox";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  errorCode: {
    fontSize: "10em",
    fontWeight: "600",
  },
  notFoundText: {
    fontSize: "2em",
    fontWeight: "600",
  },
  description: {
    textAlign: "center",
    fontSize: "1em",
    fontWeight: "600",
  },
  forgetLink: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
    },
  },
  button: {
    marginTop: "4em",
  },
  buttonPrimary: {
    fontSize: "1em",
    fontWeight: "600",
    width: "12rem",
    padding: "1em 0",
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    border: "none",
  },
}));

const NotFound = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = props;

  return (
    <AuthBox>
      <Grid item className={classes.container}>
        <Typography className={classes.errorCode}>404</Typography>
        <Typography className={classes.notFoundText}>Page Not Found</Typography>
        <Typography className={classes.description}>
          Requested URL: {window.location.href}
          <br />
          is not found on the Server
        </Typography>
        <Grid container justifyContent="center" className={classes.button}>
          <Button
            className={classes.buttonPrimary}
            type="submit"
            variant="contained"
            size="large"
            onClick={() =>
              user?.id ? history.push(path.home) : history.push(path.login)
            }
          >
            {user?.id ? "To Home" : "To Login"}
          </Button>
        </Grid>
      </Grid>
    </AuthBox>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NotFound);
