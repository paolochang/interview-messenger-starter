import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: (props) => (props.mine ? "flex-end" : "flex-start"),
    margin: (props) => (props.mine ? "0 0 0 5px" : "0 5px 0 0"),
  },
  image: {
    width: (props) => (props.size === "sm" ? 100 : 200),
    height: (props) => (props.size === "sm" ? 100 : 200),
    resizeMode: "contain",
    borderRadius: (props) =>
      props.mine ? "10px 10px 0 10px" : "0 10px 10px 10px",
  },
});

const ImageBubble = (props) => {
  const classes = useStyles(props);
  const { attachment } = props;

  let attachmentAlt = attachment.split("/").pop();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={attachment} alt={attachmentAlt} />
    </div>
  );
};

export default ImageBubble;
