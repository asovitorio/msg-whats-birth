import React, { useState } from "react";
import InputText from "../../components/InputText";
import InputDate from "../../components/InputDate";
import Buton from "../../components/Button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import api from "../../api/endpoint";

import { AccountCircle,CalendarTodayRounded,EmailRounded,WhatsApp,Save } from "@material-ui/icons/";
import { makeStyles } from '@material-ui/core/styles';
// import { Container } from './styles';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
   flexDirection:'column',
  
   width:'100%'
  },
}));

function AddCostumers() {
  const classes= useStyles()
  const initialValues ={
    name:'',
    date_birth:'',
    email:'',
    cellphone:''

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

  if(values.name===''||values.date_birth===''|| values.email === ''|| values.cellphone===''){
    return toast.info(`Preencha todos os campos!`)
  }
  try {
    let config ={
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const response = await api.post('/customers',values,config)
   
    setValues({
      ...values,
      name:'',
      date_birth:'',
      email:'',
      cellphone:''
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
      <h1>Cadastro Cliente</h1>
      <div className={classes.container}>
        <InputText icon={AccountCircle} onChange={onchange}  name={'name'} value ={values.name} type={'text'} label={"Nome do Cliente"} />
        <InputDate icon={CalendarTodayRounded} onChange={onchange}  name={'date_birth'} value ={values.date_birth} type={'date'} label={'Data de Nascimento'}/>
        <InputText icon={EmailRounded} onChange={onchange}  name={'email'} value ={values.email} type={'email'} label={"Email"} />
        <InputDate icon={WhatsApp} onChange={onchange}  name={'cellphone'} value ={values.cellphone} type={'phone'} label={'Telefone - WhatsApp'}/>
        <Buton name={"Salvar"}   icon={Save}  color={'primary'} cb ={create} />
      </div>
    </div>
  );
}
export default AddCostumers;
