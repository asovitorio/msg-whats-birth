import React, { useState } from "react";
import InputText from "../../components/InputText";
import Buton from "../../components/Button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import api from "../../api/endpoint";

import { AccountCircle,Lock,EmailRounded,Save } from "@material-ui/icons/";
import { makeStyles } from '@material-ui/core/styles';
// import { Container } from './styles';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
   flexDirection:'column',
  
   width:'100%'
  },
}));

function AddUser() {
  const classes= useStyles()
  const initialValues ={
    name:'',
    email:'',
    password:'',
    confirm:'',
    avatar:'avatar.png',
    status:1
  }
const [values,setValues] = useState(initialValues) 

const onchange = (e) =>{
  const {name,value} = e.target
  return setValues({
    ...values,
    [name]:value
  })

}
const create = async (e) =>{
  e.preventDefault();
  const {token} = JSON.parse(localStorage.getItem('user'))

  if(values.name===''||values.password===''|| values.email === ''|| values.confirm===''){
   
    return toast.info(`Preencha todos os campos!`)
  }
  if(values.password!==values.confirm){
      
    return toast.info(`As senhas não conferem`)
  }
  try {
    let config ={
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const user = {
     name: values.name,
     email: values.email,
     avatar: values.avatar,
     password: values.password,
     status: values.status,
    }
    const response = await api.post('/user',user,config)
   
    setValues({
      ...values,
      name:'',
      email:'',
      password:'',
    confirm:'',
       })

    return toast.success(`${response.data.name} - Salvo com sucesso`)
    
  } catch (error) {
    return toast.error(`Algo inesperado aconteceu => ${error}`)
  }
}
 console.log( JSON.parse(localStorage.getItem('user')).token)
  return (
    <div>
      <ToastContainer />
      <h1>Cadastro Usuários</h1>
      <div className={classes.container}>
        <InputText icon={AccountCircle} onChange={onchange}  name={'name'} value ={values.name} type={'text'} label={"Nome do Cliente"} />
        <InputText icon={EmailRounded} onChange={onchange}  name={'email'} value ={values.email} type={'email'} label={"Email"} />
        <InputText icon={Lock} onChange={onchange}  name={'password'} value ={values.password} type={'password'} label={"Senha"} />
        <InputText icon={Lock} onChange={onchange}  name={'confirm'} value ={values.confirm} type={'password'} label={"Confirme a Senha"} />
        <Buton name={"Salvar"}   icon={Save}  color={'primary'} cb ={create} />
      </div>
    </div>
  );
}
export default AddUser;
