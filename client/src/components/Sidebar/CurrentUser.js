import React, { useState } from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CurrentUserMenu from "./CurrentUserMenu";

const useStyles = makeStyles(() => ({
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
}));

const CurrentUser = (props) => {
  const classes = useStyles();
  const [isDropdown, setIsDropdown] = useState(false);

  const user = props.user || {};

  const handleCurrentUserMenu = () => {
    console.log(`handleCurrentUserMenu`);
    setIsDropdown((prev) => !prev);
  };

  return (
    <div className={classes.root}>
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
          className={classes.dropdownMenu}
          isDropdown={isDropdown}
          setIsDropdown={setIsDropdown}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CurrentUser);
