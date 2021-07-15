import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactTinyLink } from "react-tiny-link";

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => (props.mine ? "62%" : "65%"),
    margin: (props) => (props.mine ? "10px 15px" : "10px 0"),
  },
}));

const LinkBubble = (props) => {
  const classes = useStyles(props);
  const { url } = props;

  return (
    <div className={classes.root}>
      <ReactTinyLink
        cardSize="small"
        showGraphic={true}
        maxLine={2}
        minLine={1}
        url={url}
      />
    </div>
  );
};

export default LinkBubble;
