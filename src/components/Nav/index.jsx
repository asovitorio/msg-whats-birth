import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListAlt from "@material-ui/icons/ListAlt";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ButtonStatus from "../ButonStatus";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nav: {
    backgroundImage: "linear-gradient(145deg, #ffffab 0, #e9ffb6 7.14%, #ceffc0 14.29%, #b0ffca 21.43%, #91ffd2 28.57%, #6fffd8 35.71%, #4affdb 42.86%, #13ffda 50%, #00ecd7 57.14%, #00dcd4 64.29%, #00ced2 71.43%, #00c2d0 78.57%, #00b9d0 85.71%, #00b2d1 92.86%, #00add3 100%)",
    color:'#3d3d3b'
  },
  link: {
    textDecoration: "none",
    color: "#3d3b3b",
  },
  menuTitleCustomer: {
    backgroundColor: "#0bdddd",
    color: "#3d3b3b",
  },
  menuTitleUser: {
    backgroundColor: "#ffe77b",
    color: "#3d3b3b",
  },
  active: {
    backgroundColor: "#d6d6d6",
  },
  titleNav:{
    display:'flex',
    justifyContent:'space-between',
    width:'100%'
    
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const icon = [<ListAlt />, <AddBox />, <Edit />, <InboxIcon />];
  const crude = ["Listar", "Cadastrar", "Editar", "Apagar"];

  const initialActive = {
    listCustomer: true,
    addCustomers: false,
    listUser: false,
    addUser: false,
  };

  const [menuActive, setMenuActive] = useState(initialActive);
  const {user} = JSON.parse(localStorage.getItem('user'))
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.nav}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.titleNav}>
            <div>
          <Typography variant="h6" noWrap>
            Sistema de Envio de Menssagem
          </Typography>
            </div>
            <div>
          <ButtonStatus name={user.name?user.name:''}  />

            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          <ListItem button className={classes.menuTitleCustomer}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <b>
              <ListItemText primary="Clientes" />
            </b>
          </ListItem>
        </List>

        <List>
          <Link
            className={classes.link}
            to={"/home"}
            onClick={(e) => {
              setMenuActive({
                ...menuActive,
                listCustomer: true,
                addCustomers: false,
                listUser: false,
                addUser: false,
              });
            }}
          >
            <ListItem
              button
              className={menuActive.listCustomer ? classes.active : ""}
            >
              <ListItemIcon>{icon[0]}</ListItemIcon>
              <ListItemText primary={crude[0]} />
            </ListItem>
          </Link>
          <Link
            className={classes.link}
            to={"/customers-create"}
            onClick={(e) => {
              setMenuActive({
                ...menuActive,
                listCustomer: false,
                addCustomers: true,
                listUser: false,
                addUser: false,
              });
            }}
          >
            <ListItem
              button
              className={menuActive.addCustomers ? classes.active : ""}
            >
              <ListItemIcon>{icon[1]}</ListItemIcon>
              <ListItemText primary={crude[1]} />
            </ListItem>
          </Link>
        </List>

        <Divider />
        <List>
          <ListItem button className={classes.menuTitleUser}>
            <ListItemIcon>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
            <hr />
          </ListItem>
        </List>
        <List>
          <Link
            className={classes.link}
            to={"/users-list"}
            onClick={(e) => {
              setMenuActive({
                ...menuActive,
                listCustomer: false,
                addCustomers: false,
                listUser: true,
                addUser: false,
              });
            }}
          >
            <ListItem
              button
              className={menuActive.listUser ? classes.active : ""}
            >
              <ListItemIcon>{icon[0]}</ListItemIcon>
              <ListItemText primary={crude[0]} />
            </ListItem>
          </Link>
          <Link
            className={classes.link}
            to={"/users-create"}
            onClick={(e) => {
              setMenuActive({
                ...menuActive,
                listCustomer: false,
                addCustomers: false,
                listUser: false,
                addUser: true,
              });
            }}
          >
            <ListItem
              button
              className={menuActive.addUser? classes.active : ""}
            >
              <ListItemIcon>{icon[1]}</ListItemIcon>
              <ListItemText primary={crude[1]} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
         {props.page}
      </main>
    </div>
  );
}
