import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface styleProps {
  mine: boolean;
  size?: string;
}

const useStyles = makeStyles<Theme, styleProps>((theme) =>
  createStyles({
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
  })
);

interface Props {
  attachment: string;
  mine: boolean;
  size?: string;
}

const ImageBubble: React.FC<Props> = ({ attachment, mine, size }) => {
  const styleProps = { mine, size };
  const classes = useStyles(styleProps);

  let attachmentAlt = attachment.split("/").pop();

  return (
    <Grid className={classes.root}>
      <img className={classes.image} src={attachment} alt={attachmentAlt} />
    </Grid>
  );
};

export default ImageBubble;
