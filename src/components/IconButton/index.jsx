import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function IconButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
      <IconButton color={props.color} aria-label={props.label} onClick={props.click} href={props.url}>
        {props.icon}
      </IconButton>
    </div>
  );
}
