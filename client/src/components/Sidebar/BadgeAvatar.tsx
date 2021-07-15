import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Badge, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profilePic: {
      height: 44,
      width: 44,
    },
    badge: {
      height: 13,
      width: 13,
      borderRadius: "50%",
      border: "2px solid white",
      backgroundColor: "#D0DAE9",
    },
    online: {
      backgroundColor: "#1CED84",
    },
    sidebar: {
      marginLeft: 17,
    },
  })
);

interface Props {
  sidebar?: boolean;
  username?: string;
  photoUrl: string;
  online: boolean;
}

const BadgeAvatar: React.FC<Props> = ({
  sidebar,
  username,
  photoUrl,
  online,
}) => {
  const classes = useStyles();

  return (
    <Box className={sidebar ? classes.sidebar : ""}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circular"
      >
        <Avatar
          alt={username}
          src={photoUrl}
          className={classes.profilePic}
        ></Avatar>
      </Badge>
    </Box>
  );
};

export default BadgeAvatar;
