import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { path } from "../routes";
import AuthBox from "../components/AuthBox";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
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

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    alert("find password, back-end is not implemented");
  };

  const inputHandler = (event) => {
    setEmail(event.target.value);
  };

  const disabled = !email.length;

  return (
    <AuthBox
      actionText="Go back to login page?"
      buttonText="Login"
      actionRoute={path.login}
    >
      <form onSubmit={handleLogin} className={classes.form}>
        <Grid item className={classes.innerForm}>
          <Typography className={classes.welcomeText}>
            Forgot password?
          </Typography>
          <FormControl className={classes.inputControl} required={true}>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              value={email}
              onChange={inputHandler}
            />
          </FormControl>
          <Grid container justifyContent="center" className={classes.button}>
            <Button
              className={classes.buttonPrimary}
              type="submit"
              variant="contained"
              size="large"
              disabled={disabled}
            >
              Find password
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthBox>
  );
};

export default ForgotPassword;
