import React, { Component } from "react";
import {
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, postAttachments } from "../../store/utils/thunkCreators";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import EmojiInput from "./EmojiInput";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
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
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      images: [],
      cursorPosition: null,
      isEmoji: false,
    };
    this.textRef = React.createRef();
    this.handleEmojiBox = this.handleEmojiBox.bind(this);
    this.handleImagesSelect = this.handleImagesSelect.bind(this);
  }

  handleEmojiBox = () => {
    this.setState({
      isEmoji: !this.state.isEmoji,
    });
  };

  handleEmojiPick = (e, { emoji }) => {
    const ref = this.textRef.current.firstChild;
    ref.focus();
    const startString = this.state.text.substring(0, ref.selectionStart);
    const endString = this.state.text.substring(ref.selectionStart);
    const newString = startString + emoji + endString;
    this.handleEmojiBox();
    this.setState(
      {
        text: newString,
        cursorPosition: startString.length + emoji.length,
      },
      () => {
        this.textRef.current.firstChild.selectionStart =
          this.textRef.current.firstChild.selectionEnd =
            this.state.cursorPosition;
      }
    );
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.files !== []) {
      const attBody = {
        sender: this.props.conversationId ? null : this.props.user,
        attachments: event.target.files,
      };
      await this.props.postAttachments(attBody);
    }

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text:
        this.state.text !== ""
          ? this.state.text.substring(0, 254)
          : "Sent photo",
      recipientId: this.props.otherUser.id,
      conversationId: this.props.conversationId,
      sender: this.props.conversationId ? null : this.props.user,
      attachments:
        this.props.attachments !== ""
          ? this.props.attachments
          : this.state.images,
    };

    await this.props.postMessage(reqBody);
    this.setState({
      text: "",
      images: [],
    });
  };

  handleImagesSelect = (event) => {
    event.preventDefault();
    this.setState({ images: event.target.files });
    this.handleSubmit(event);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        {this.state.isEmoji && (
          <EmojiInput
            isBox={this.state.isEmoji}
            setIsBox={this.handleEmojiBox}
            pickEmoji={this.handleEmojiPick}
          />
        )}
        <FormControl fullWidth hiddenLabel required>
          <FilledInput
            ref={this.textRef}
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end" className={classes.endIcons}>
                <IconButton aria-label="emoji" onClick={this.handleEmojiBox}>
                  <SentimentSatisfiedIcon />
                </IconButton>
                <IconButton
                  aria-label="file"
                  onClick={() => this.fileUpload.click()}
                >
                  <PhotoLibraryIcon />
                </IconButton>
                <FormControl className={classes.fileInput}>
                  <input
                    ref={(fileUpload) => (this.fileUpload = fileUpload)}
                    type="file"
                    name="uploads"
                    onChange={(e) => this.handleImagesSelect(e)}
                    multiple
                  />
                </FormControl>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
    attachments: state.attachments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    postAttachments: (files) => {
      return dispatch(postAttachments(files));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
