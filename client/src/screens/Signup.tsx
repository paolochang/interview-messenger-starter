import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { path } from "../routes";
import { register } from "../store/utils/thunkCreators";
import AuthBox from "../components/AuthBox";
import MetaDecorator from "../utils/MetaDecorator";
import { IUser } from "../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "center",
      width: "90%",
    },
    createText: {
      fontSize: "2em",
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5em",
      },
    },
    innerForm: {
      width: "90%",
    },
    inputControl: {
      width: "90%",
      margin: "1rem 0",
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

interface FormErrorMessageProp {
  confirmPassword?: string;
}

interface Props {
  user: IUser;
  register: any;
}

const Signup: React.FC<Props> = ({ user, register }) => {
  const classes = useStyles();
  const [formErrorMessage, setFormErrorMessage] =
    useState<FormErrorMessageProp>({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();

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
    <AuthBox
      actionText="Already have an account?"
      buttonText="Login"
      actionRoute={path.login}
    >
      <MetaDecorator
        title="Sign Up"
        description="Sign up Messenger and converse with anyone with any language"
      />
      <form onSubmit={handleRegister} className={classes.form}>
        <Grid className={classes.innerForm}>
          <Typography className={classes.createText}>
            Create an account.
          </Typography>
          <FormControl className={classes.inputControl} required>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              type="text"
            />
          </FormControl>
          <FormControl className={classes.inputControl} required>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl
            className={classes.inputControl}
            error={!!formErrorMessage.confirmPassword}
            required
          >
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
          </FormControl>
          <FormControl
            className={classes.inputControl}
            error={!!formErrorMessage.confirmPassword}
            required
          >
            <TextField
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            />
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
          </FormControl>
          <Grid container justifyContent="center" className={classes.button}>
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
    register: (credentials: any) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
