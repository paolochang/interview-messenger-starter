import React, { useState } from "react";
import { Grid, Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CurrentUserMenu from "./CurrentUserMenu";
import { IUser } from "../../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      height: 44,
      marginTop: 23,
      marginLeft: 6,
      display: "flex",
      alignItems: "center",
    },
    subContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexGrow: 1,
    },
    username: {
      letterSpacing: -0.23,
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 17,
    },
    iconButton: {
      marginRight: 24,
    },
    ellipsis: {
      color: "#95A7C4",
      opacity: 0.5,
    },
  })
);

interface Props {
  user: IUser;
}

const CurrentUser: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const [isDropdown, setIsDropdown] = useState(false);

  const handleCurrentUserMenu = () => {
    setIsDropdown((prev) => !prev);
  };

  return (
    <Grid className={classes.root}>
      <Box className={classes.container}>
        <BadgeAvatar photoUrl={user.photoUrl} online={true} />
        <Box className={classes.subContainer}>
          <Typography className={classes.username}>{user.username}</Typography>
          <IconButton
            aria-label="user-menu"
            className={classes.iconButton}
            onClick={handleCurrentUserMenu}
          >
            <MoreHorizIcon classes={{ root: classes.ellipsis }} />
          </IconButton>
        </Box>
      </Box>
      {isDropdown && (
        <CurrentUserMenu
          isDropdown={isDropdown}
          setIsDropdown={setIsDropdown}
        />
      )}
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CurrentUser);
