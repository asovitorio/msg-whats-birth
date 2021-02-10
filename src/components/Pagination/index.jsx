import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display:'flex',
    justifyContent:'center'
  },
}));

export default function PaginationOutlined(props) {
  const classes = useStyles();
console.log(Pagination.display)
  return (
    <div className={classes.root}>
      <Pagination onClick={props.value}  count={props.pages} color="primary" variant="outlined"  hidePrevButton hideNextButton  />
    </div>
  );
}
