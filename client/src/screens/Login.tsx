import React, { useState } from "react";
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
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { path } from "../routes";
import { login } from "../store/utils/thunkCreators";
import AuthBox from "../components/AuthBox";
import MetaDecorator from "../utils/MetaDecorator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "center",
    },
    innerForm: {
      width: "90%",
    },
    inputControl: {
      width: "90%",
      margin: "1rem 0",
    },
    welcomeText: {
      fontSize: "2em",
      fontWeight: 600,
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
      fontWeight: 600,
      width: "12rem",
      padding: "1em 0",
      backgroundColor: theme.palette.primary.main,
      color: "#FFFFFF",
      border: "none",
    },
  })
);

interface Props {
  user: any;
  login: any;
}

const Login: React.FC<Props> = ({ user, login }) => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const { user, login } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
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
      <MetaDecorator
        title="Login"
        description="Login Messenger and converse with anyone with any language"
      />
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
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
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
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
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

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (credentials: number) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
