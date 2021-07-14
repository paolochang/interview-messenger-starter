import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { path } from "../routes";
import AuthBox from "../components/AuthBox";
import MetaDecorator from "../utils/MetaDecorator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
    },
    errorCode: {
      fontSize: "10em",
      fontWeight: 600,
    },
    notFoundText: {
      fontSize: "2em",
      fontWeight: 600,
    },
    description: {
      textAlign: "center",
      fontSize: "1em",
      fontWeight: 600,
    },
    urlHighlight: {
      color: "#22A7F0",
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
}

const NotFound: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AuthBox>
      <MetaDecorator
        title="404"
        description="Page is not found on the server"
      />
      <Grid item className={classes.container}>
        <Typography className={classes.errorCode}>404</Typography>
        <Typography className={classes.notFoundText}>Page Not Found</Typography>
        <Typography className={classes.description}>
          Requested URL:
          <br />
          <span className={classes.urlHighlight}>{window.location.href}</span>
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

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NotFound);
