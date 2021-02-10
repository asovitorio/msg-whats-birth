import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Pagination from "../Pagination";
import api from "../../api/endpoint";
import format from "date-fns/format";
import {Delete,Edit} from "@material-ui/icons/";
import Button from '../IconButton'
import { toast, ToastContainer } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  main:{
    display:'flex',
    flexDirection:'column',
    alignItems: 'center'
  },
  p: {
    margin: "0",
  },
  root: {
    width: "100%",
    maxWidth: "180ch",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "6px 0 12px hsla(0, 0%, 0%, 0.493)",
    
  },
  inline: {
    display: "inline",
    fontWeight: "bold",
  },
  butonsList:{
   
    display:'flex',
    justifyContent:'flex-end'
  }
}));

export default function AlignItemsList(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  
  const [users, setUsers] = useState([]);

  const value = (e) => {
    setPage(e.target.innerText);
  };
  
  useEffect( () => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    api.get(`/user?page=${page}`, config)
    .then(response =>{
      setUsers(response.data.users)
      setTotalPage(response.data.totalPages)
    })
    
  },[page]);
  console.log(users)
  
 const handleDeleteUser = async (id) =>{
   try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const confirm =window.confirm('Tem certeza que vai apagar o registro?')
    if(confirm){
      const resp = await api.delete(`/user/${id}`,config)
      console.log(resp)
      setUsers(users.filter( user => user.id !== id))
             console.log(id)
         return toast.warning('Registro apagado => id:' +id)  
      
    }
  } catch (error) {
  return toast.error('erro ao deletar')
  }

 }

  const classes = useStyles();
  return (
    <div className={classes.main} >
     <List className={classes.root} >
       <ToastContainer />
        {users.map(item =>(
          <div>
          <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt={item.name} src="#" />
    </ListItemAvatar>
    <ListItemText>
      <h4 className={classes.p}>{item.name}</h4>
           <p className={classes.p}>
        <b>Email: </b>
        {item.email}
      </p>
      <p className={classes.p}>
        <b>Status: </b>
        {item.status==='1'?'Adm':'User'}
      </p>
      <p className={classes.p}>
        <b>Desde: </b>
        {format(new Date(item.createdAt),'dd/MM/yyyy')}
      </p>
    </ListItemText>
    <ListItemText>
      <div className={classes.butonsList}>
      <Button  icon={<Edit />} label ={'Edit'} color ={'primary'} url={`/user-update/${item.id}`} />
      <Button icon={<Delete />} label ={'Delete'} color ={'secondary'} 
      click={()=>handleDeleteUser(item.id)}/>
      </div>
    </ListItemText>
  </ListItem>
    <Divider variant="inset" component="li" />
          </div>
         ))} 
      </List> 
   { <Pagination value={value} pages={totalPage}  /> }
   </div>
   );
}

