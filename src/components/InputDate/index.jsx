import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
   width:'100%',
   alignItems:'flex-end'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  icon:{
    color:'#6b6b6b ',
    fontSize:'30px',
    marginRight:'10px',
    marginLeft:'10px'
   
  }
}));

export default function DatePickers(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <props.icon className={classes.icon} />
      <TextField
       
        label={props.label}
        type={props.type}
        className={classes.textField}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
