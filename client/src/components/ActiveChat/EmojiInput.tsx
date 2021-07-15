import React, { Dispatch, SetStateAction, useRef } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import EmojiPicker from "emoji-picker-react";
import { useClickOutside } from "../../hooks/useClickOutside";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "absolute",
      right: 60,
      bottom: 10,
    },
  })
);

interface Props {
  isBox: boolean;
  setIsBox: Dispatch<SetStateAction<boolean>>;
  pickEmoji: any;
}

const EmojiInput: React.FC<Props> = ({ isBox, setIsBox, pickEmoji }) => {
  const classes = useStyles();
  const wrapperRef = useRef(null);

  const onClickOutsideBox = () => {
    setIsBox((prev: any) => !prev);
  };

  useClickOutside(wrapperRef, isBox, onClickOutsideBox);

  return (
    <div ref={wrapperRef} className={classes.container}>
      <EmojiPicker onEmojiClick={pickEmoji} />
    </div>
  );
};

export default EmojiInput;
