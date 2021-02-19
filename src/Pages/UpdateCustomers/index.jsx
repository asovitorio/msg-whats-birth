import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputText from "../../components/InputText";
import InputDate from "../../components/InputDate";
import Buton from "../../components/Button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import api from "../../api/endpoint";
import format from "date-fns/format";

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
  const {id} = useParams()
  const initialValues = () =>{
   return { id:'',
    name:'',
    date_birth:'',
    email:'',
    cellphone:''
}
  }
const [values,setValues] = useState(initialValues) 

  useEffect( ()=>{
    const findOne = async (id) =>{
      const {token} = JSON.parse(localStorage.getItem('user'))
      try {
        let config ={
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        const response = await api.get(`/customers/${id}`,config)
       const {data} = response
     
    return   setValues(() =>{
       return { ...values,
        id:data.id,
        name:data.name,
        date_birth:format(new Date(data.date_birth), 'yyyy-MM-dd'),
        email:data.email,
        cellphone:data.cellphone}
      })
        
      } catch (error) {
        console.log(error)
      }
    }
    findOne(id)
  },[id])

  const classes= useStyles()
 

const onchange = (e) =>{
  const {name,value} = e.target
  return setValues({
    ...values,
    [name]:value
  })

}
const update = async (e) =>{
  e.preventDefault();
  const {token} = JSON.parse(localStorage.getItem('user'))

  if(values.name===''||values.date_birth === ''|| values.email === ''|| values.cellphone===''){
    return toast.info(`Preencha todos os campos!`)
  }
  try {
    let config ={
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    const response = await api.put('/customers',values,config)
    return toast.success(`${JSON.parse(response.config.data).name} - Atualizado com sucesso com sucesso`)
  } catch (error) {
    return toast.error(`Algo inesperado aconteceu => ${error}`)
  }
}

 
  return (
    <div>
      <ToastContainer />
      <h1>Atualizar Cliente</h1>
      <div className={classes.container}>
      
        <InputText icon={AccountCircle} onChange={onchange}  name={'name'} value ={values.name} type={'text'} label={"Nome do Cliente"} />
        <InputDate icon={CalendarTodayRounded} onChange={onchange}  name={'date_birth'} value ={values.date_birth} type={'date'} label={'Data de Nascimento'}/>
        <InputText icon={EmailRounded} onChange={onchange}  name={'email'} value ={values.email} type={'email'} label={"Email"} />
        <InputDate icon={WhatsApp} onChange={onchange}  name={'cellphone'} value ={values.cellphone} type={'phone'} label={'Telefone - WhatsApp'}/>
        <Buton name={"Atualizar"}   icon={Save}  color={'primary'} cb ={update} />
      </div>
    </div>
  );
}
export default AddCostumers;
