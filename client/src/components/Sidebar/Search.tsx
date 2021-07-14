import React from "react";
import { FormControl, FilledInput, InputAdornment } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filledInput: {
      height: 50,
      background: "#E9EEF9",
      borderRadius: 5,
      fontSize: 13,
      fontWeight: "bold",
      color: "#99A9C4",
      letterSpacing: 0,
      display: "flex",
      justifyContent: "center",
      marginBottom: 20,
    },
    input: {
      "&::placeholder": {
        color: "#ADC0DE",
        opacity: 1,
      },
    },
  })
);

interface Props {
  handleChange: any;
}

const Search: React.FC<Props> = ({ handleChange }) => {
  const classes = useStyles();

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          name="search"
          onChange={handleChange}
          classes={{ root: classes.filledInput, input: classes.input }}
          disableUnderline
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        ></FilledInput>
      </FormControl>
    </form>
  );
};

export default Search;
