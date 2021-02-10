import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5),
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        startIcon={<props.icon />}
        onClick = {props.cb}
      >
        {props.name}
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
     
    </div>
  );
}
