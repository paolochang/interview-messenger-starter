import React, { Dispatch, SetStateAction, useRef } from "react";
import { connect } from "react-redux";
import { MenuList, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useClickOutside } from "../../hooks/useClickOutside";
import { logout } from "../../store/utils/thunkCreators";
import { clearOnLogout } from "../../store/index";
import { IUser } from "../../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      float: "right",
      boxShadow: "0 2px 10px 0 rgba(88,133,196,0.2)",
      width: "100px",
      borderRadius: "4px",
      padding: "10px",
      marginRight: "35px",
    },
  })
);

interface Props {
  user: IUser;
  logout: any;
  isDropdown: boolean;
  setIsDropdown: Dispatch<SetStateAction<boolean>>;
}

const CurrentUserMenu: React.FC<Props> = ({
  user,
  logout,
  isDropdown,
  setIsDropdown,
}) => {
  const classes = useStyles();
  const menuRef = useRef(null);

  const onClickOutsideMenu = () => {
    setIsDropdown(false);
  };

  useClickOutside(menuRef, isDropdown, onClickOutsideMenu);

  const handleLogout = async (event: any) => {
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

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (id: number) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserMenu);
