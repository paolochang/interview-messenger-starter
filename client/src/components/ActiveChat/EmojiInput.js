import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EmojiPicker from "emoji-picker-react";
import { useClickOutside } from "../../hooks/useClickOutside";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    float: "right",
    right: "4rem",
  },
}));

const EmojiInput = ({ isBox, setIsBox, pickEmoji }) => {
  const classes = useStyles();
  const wrapperRef = useRef(null);

  const onClickOutsideBox = () => {
    setIsBox((prev) => !prev);
  };

  useClickOutside(wrapperRef, isBox, onClickOutsideBox);

  return (
    <div ref={wrapperRef} className={classes.container}>
      <EmojiPicker onEmojiClick={pickEmoji} />
    </div>
  );
};

export default EmojiInput;
