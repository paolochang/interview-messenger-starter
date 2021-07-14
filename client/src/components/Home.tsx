import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { fetchConversations } from "../store/utils/thunkCreators";
import { path } from "../routes";
import { IUser } from "../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "97vh",
    },
  })
);

interface Props {
  user: IUser;
  fetchConversations: any;
}

const Home: React.FC<Props> = ({ user, fetchConversations }) => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // componentDidUpdate(prevProps)
    if (user.id) setIsLoggedIn(true);
    // componentDidMount()
    fetchConversations();
  }, [user.id, fetchConversations]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to={path.login} />;
    return <Redirect to={path.register} />;
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
