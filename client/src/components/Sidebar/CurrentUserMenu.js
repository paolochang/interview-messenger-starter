import React, { useRef } from "react";
import { connect } from "react-redux";
import { MenuList, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useClickOutside } from "../../hooks/useClickOutside";
import { logout } from "../../store/utils/thunkCreators";
import { clearOnLogout } from "../../store/index";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    float: "right",
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.2)",
    width: "100px",
    borderRadius: "4px",
    padding: "10px",
    marginRight: "35px",
  },
}));

const CurrentUserMenu = (props) => {
  const classes = useStyles();
  const { user, logout, isDropdown, setIsDropdown } = props;
  const menuRef = useRef(null);

  const onClickOutsideMenu = () => {
    setIsDropdown(false);
  };

  useClickOutside(menuRef, isDropdown, onClickOutsideMenu);

  const handleLogout = async (event) => {
    event.preventDefault();
    await logout(user.id);
  };

  return (
    <MenuList
      id="current-user-menu"
      ref={menuRef}
      className={classes.container}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </MenuList>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserMenu);
