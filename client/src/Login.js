import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import bgImage from "./assets/images/bg-img.png";
import { ReactComponent as ChatBubble } from "./assets/images/bubble.svg";

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <Box className={classes.container}>
        <Grid container className={classes.image}>
          <ChatBubble className={classes.overlayIcon} />
          <Typography className={classes.overlayText}>
            Converse with anyone
            <br /> with any language
          </Typography>
        </Grid>
        <div className={classes.base}>
          <Grid container item className={classes.signup}>
            <Typography className={classes.signupText}>
              Don't have an account?
            </Typography>
            <Button
              onClick={() => history.push("/register")}
              className={classes.buttonSecondary}
            >
              Create account
            </Button>
          </Grid>
          <form onSubmit={handleLogin} className={classes.form}>
            <Grid item className={classes.innerForm}>
              <Typography className={classes.welcomeText}>
                Welcome back!
              </Typography>
              <FormControl
                className={classes.innerForm}
                margin="normal"
                required
              >
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
              <FormControl
                className={classes.innerForm}
                margin="normal"
                required
              >
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Grid item className={classes.button}>
                <Button
                  className={classes.buttonPrimary}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
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
  },
  image: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
      backgroundSize: "cover",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "3rem",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  signupText: {
    margin: "2rem",
    color: "#AFAFAF",
  },
  buttonSecondary: {
    fontSize: "1em",
    padding: "1em 2em",
    color: theme.palette.primary.main,
    boxShadow:
      "0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
  },
  form: {
    width: "70%",
  },
  innerForm: {
    width: "90%",
  },
  welcomeText: {
    fontSize: "2em",
    fontWeight: "600",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    margin: "4em",
  },
  buttonPrimary: {
    fontSize: "1em",
    fontWeight: "600",
    padding: "1em 5.5em",
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    border: "none",
  },
}));

export default connect(mapStateToProps, mapDispatchToProps)(Login);
