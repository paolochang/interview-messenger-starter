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
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

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
    };
  }

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
      text: this.state.text !== "" ? this.state.text : "Sent photo",
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
        <FormControl fullWidth hiddenLabel required>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
            inputRef={(input) => input && input.focus()}
            endAdornment={
              <InputAdornment position="end" className={classes.endIcons}>
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
