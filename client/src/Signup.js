import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import bgImage from "./assets/images/bg-img.png";
import { ReactComponent as ChatBubble } from "./assets/images/bubble.svg";

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <Box className={classes.container}>
        <Grid item className={classes.image}>
          <ChatBubble className={classes.overlayIcon} />
          <Typography className={classes.overlayText}>
            Converse with anyone
            <br /> with any language
          </Typography>
        </Grid>
        <Grid className={classes.base}>
          <Grid container item className={classes.login}>
            <Typography className={classes.loginText}>
              Already have an account?
            </Typography>
            <Button
              onClick={() => history.push("/login")}
              className={classes.buttonSecondary}
            >
              Login
            </Button>
          </Grid>
          <form onSubmit={handleRegister} className={classes.form}>
            <Grid className={classes.innerForm}>
              <Typography className={classes.createText}>
                Create an account.
              </Typography>
              <FormControl className={classes.innerForm}>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
              <FormControl className={classes.innerForm}>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
              <FormControl
                className={classes.innerForm}
                error={!!formErrorMessage.confirmPassword}
              >
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <FormControl
                className={classes.innerForm}
                error={!!formErrorMessage.confirmPassword}
              >
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <Grid className={classes.button}>
                <Button
                  className={classes.buttonPrimary}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
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
    register: (credentials) => {
      dispatch(register(credentials));
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
    backgroundImage: `linear-gradient(to bottom, #3A8DFFAA, #86B9FF ),
    url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "85%",
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
  login: {
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
  loginText: {
    margin: "2rem",
    color: "#AFAFAF",
  },
  buttonSecondary: {
    fontSize: "1em",
    padding: "1em 4em",
    color: theme.palette.primary.main,
    boxShadow:
      "0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
  },
  form: {
    width: "70%",
  },
  createText: {
    fontSize: "2em",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  innerForm: {
    width: "90%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    margin: "4em",
  },
  buttonPrimary: {
    fontSize: "1em",
    fontWeight: "600",
    padding: "1em 5em",
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    border: "none",
  },
}));

export default connect(mapStateToProps, mapDispatchToProps)(Login);
