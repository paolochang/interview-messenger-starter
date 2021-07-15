import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { postMessage, postAttachments } from "../../store/utils/thunkCreators";
import {
  Grid,
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import EmojiInput from "./EmojiInput";
import { IUser } from "../../type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifySelf: "flex-end",
      marginTop: 15,
    },
    emojiWrapper: {
      position: "relative",
    },
    input: {
      height: 70,
      backgroundColor: "#F4F6FA",
      borderRadius: 8,
      marginBottom: 20,
    },
    fileInput: {
      width: "0",
      visibility: "hidden",
    },
    endIcons: {},
  })
);

interface Props {
  scrollToBottom: any;
  user: IUser;
  attachments: any;
  postMessage: any;
  postAttachments: any;
  conversationId: number;
  otherUser: any;
}

const Input: React.FC<Props> = ({
  scrollToBottom,
  user,
  attachments,
  postMessage,
  postAttachments,
  conversationId,
  otherUser,
}) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [cursorPosition, setCursorPosition] = useState<number>();
  const [isEmoji, setIsEmoji] = useState<boolean>(false);
  const textRef = useRef<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleEmojiBox = () => {
    setIsEmoji((prev) => !prev);
  };

  useEffect(() => {
    if (cursorPosition) {
      textRef.current!.firstChild!.setSelectionRange(
        cursorPosition,
        cursorPosition
      );
    }
  }, [cursorPosition]);

  const handleEmojiPick = (e: any, { emoji }: { emoji: any }) => {
    const ref = textRef.current?.firstChild;
    ref.focus();
    const startString = text.substring(0, ref.selectionStart);
    const endString = text.substring(ref.selectionStart);
    const newString = startString + emoji + endString;
    setText(newString);
    setCursorPosition(startString.length + emoji.length);
    handleEmojiBox();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (event.target.files !== []) {
      const attBody = {
        sender: conversationId ? null : user,
        attachments: event.target.files,
      };
      await postAttachments(attBody);
    }

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text !== "" ? text.substring(0, 254) : "Photo sent",
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
      attachments: attachments !== "" ? attachments : images,
    };

    await postMessage(reqBody);
    setText("");
    setImages([]);
    scrollToBottom();
  };

  const handleImagesSelect = (event: any) => {
    event.preventDefault();
    setImages(event.target.files);
    handleSubmit(event);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container className={classes.emojiWrapper}>
        {isEmoji && (
          <EmojiInput
            isBox={isEmoji}
            setIsBox={handleEmojiBox}
            pickEmoji={handleEmojiPick}
          />
        )}
      </Grid>
      <FormControl fullWidth hiddenLabel required>
        <FilledInput
          ref={textRef}
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={(event) => setText(event.target.value)}
          endAdornment={
            <InputAdornment position="end" className={classes.endIcons}>
              <IconButton aria-label="emoji" onClick={handleEmojiBox}>
                <SentimentSatisfiedIcon />
              </IconButton>
              <IconButton
                aria-label="file"
                onClick={() => fileRef.current?.click()}
              >
                <PhotoLibraryIcon />
              </IconButton>
              <FormControl className={classes.fileInput}>
                <input
                  ref={fileRef}
                  type="file"
                  name="uploads"
                  onChange={(e) => handleImagesSelect(e)}
                  multiple
                />
              </FormControl>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    conversations: state.conversations,
    attachments: state.attachments,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    postMessage: (message: string) => {
      dispatch(postMessage(message));
    },
    postAttachments: (files: any) => {
      return dispatch(postAttachments(files));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
