import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { path } from "./routes";
import { login } from "./store/utils/thunkCreators";
import AuthBox from "./components/AuthBox";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
  },
  innerForm: {
    width: "90%",
  },
  inputControl: {
    width: "100%",
    margin: "1rem 0",
  },
  welcomeText: {
    fontSize: "2em",
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

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

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
    <AuthBox
      actionText="Don't have an account?"
      buttonText={mobile ? "Join" : "Create account"}
      actionRoute={path.register}
    >
      <form onSubmit={handleLogin} className={classes.form}>
        <Grid item className={classes.innerForm}>
          <Typography className={classes.welcomeText}>Welcome back!</Typography>
          <FormControl
            className={classes.inputControl}
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
            className={classes.inputControl}
            margin="normal"
            required
          >
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Link
                      className={classes.forgetLink}
                      onClick={() => history.push(path.forgot)}
                    >
                      Forgot?
                    </Link>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Grid container justifyContent="center" className={classes.button}>
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
    </AuthBox>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
