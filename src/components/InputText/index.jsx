import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  style: {
    margin: theme.spacing(1),
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    maxWidth: "1000px",
    marginBottom: "20px",
  },
  icon: {
    color: "#6b6b6b ",
    fontSize: "30px",
    marginRight: "10px",
  },
  boxInput: {},
}));

export default function InputWithIcon(props) {
  const classes = useStyles();

  return (
    <div className={classes.boxInput}>
      <div className={classes.style}>
        <props.icon className={classes.icon} />
        <TextField
          fullWidth
          name={props.name}
          value={props.value}
          type={props.type}
          label={props.label}
          onChange ={props.onChange}
        />
      </div>
    </div>
  );
}
