import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { WhatsApp } from "@material-ui/icons/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import api from "../../api/endpoint";
import AlertError from "../../components/alertError";
import jwt_decode from "jwt-decode";

// import moment from "moment";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Alessandro
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(6),
    backgroundColor: "green",
    height: 60,
    width: 60,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    textAlign: "center",
  },
  body: {
    backgroundImage:
      "linear-gradient(145deg, #ffffab 0, #e9ffb6 7.14%, #ceffc0 14.29%, #b0ffca 21.43%, #91ffd2 28.57%, #6fffd8 35.71%, #4affdb 42.86%, #13ffda 50%, #00ecd7 57.14%, #00dcd4 64.29%, #00ced2 71.43%, #00c2d0 78.57%, #00b9d0 85.71%, #00b2d1 92.86%, #00add3 100%)",
    height: "100vh",
    width: "100vw",
    display: "fixed",
  },
  card:{
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.57)',
    padding: '20px 10px',
    borderTopLeftRadius: '100px',
    borderBottomRightRadius: '20px',
    boxShadow: '0 0 10px rgb(0 0 0 / 50%)'
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const initialInputs = () => {
    return {
      email: "",
      password: "",
    };
  };
  const [values, setValues] = useState(initialInputs);
  const [msg, setMsg] = useState(false);
  const onchange = (e) => {
    e.preventDefault();
    setMsg(false);
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth", values);
      const decoded = jwt_decode(response.data.token);
      const user = {
        user:decoded,
        token:response.data.token
      }
      localStorage.setItem("user", JSON.stringify(user));
      console.log(JSON.parse(localStorage.getItem("user")));
      history.push("/home");
      return console.log(true);
    } catch (error) {
      setMsg(true);
      return console.log(false);
    }
  };

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.card}>

          <Avatar className={classes.avatar}>
            <WhatsApp />
          </Avatar>
          <Typography component="h1" variant="h5">
            Birth-Msg
          </Typography>
          {msg ? (
            <AlertError
              title="Não Autorizado"
              body="Usuário ou senha invalidos"
            />
          ) : (
            ""
          )}
          <form action="/home" method="GET" className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={onchange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={onchange}
            />

            <Button
              block={toString(true)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
