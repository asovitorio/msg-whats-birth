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
    justifyContent:'center'
  }
}));

export default function AlignItemsList(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  
  const [dataCustomers, setDataCustomers] = useState([]);

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
    api.get(`/customers?page=${page}`, config)
    .then(response =>{
      setDataCustomers(response.data.customers)
      setTotalPage(response.data.totalPages)
      })

     },[page]);
     
 const handleDeleteCustomers = async (id) =>{
   try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const confirm =window.confirm('Tem certeza que vai apagar o registro?')
    if(confirm){
      const resp = await api.delete(`/customers/${id}`,config)
      
      setDataCustomers(dataCustomers.filter( customer => customer.id !== id))
        
        console.log(resp)
         return toast.warning('Registro apagado => id:' +id)  
      
    }
  } catch (error) {
  return toast.error('erro ao deletar')
  }

 }

  const classes = useStyles();
  return (
    <>
     <List className={classes.root} >
       <ToastContainer />
        {dataCustomers.map(item =>(
          <>
          <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt={item.name} src="#" />
    </ListItemAvatar>
    <ListItemText>
      <h4 className={classes.p}>{item.name}</h4>
      <p className={classes.p}>
        <b>Data de Nasc: </b>
        {format(new Date(item.date_birth), 'dd/MM/yyyy')}
      </p>
      <p className={classes.p}>
        <b>Email: </b>
        {item.email}
      </p>
      <p className={classes.p}>
        <b>Telefone: </b>
        {item.cellphone}
      </p>
    </ListItemText>
    <ListItemText>
      <div className={classes.butonsList}>
      <Button  icon={<Edit />} label ={'Edit'} color ={'primary'} url={`/customer-update/${item.id}`} />
      <Button icon={<Delete />} label ={'Delete'} color ={'secondary'} 
      click={()=>handleDeleteCustomers(item.id)}/>
      </div>
    </ListItemText>
  </ListItem>
    <Divider variant="inset" component="li" />
          
          </>
        ))}
    

      </List> 
   <Pagination value={value} pages={totalPage}  />
   </>
   );
}

