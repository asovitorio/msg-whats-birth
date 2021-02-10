import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function UpdateUsers() {
  const {id} = useParams()
  const initialValues = () =>{
   return {
     id:'',
    name:'',
    password:'',
    confirm:'',
    avatar:'avatar.png',
    status:1
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
        const response = await api.get(`/user/${id}`,config)
       const {data} = response
     
    return   setValues(() =>{
       return { ...values,
        id:data.id,
        name:data.name,
        email:data.email,
        avatar:'avatar.png',
        password:'',
        status:1,
        confirm:'',
      }
      })
        
      } catch (error) {
        console.log(error)
      }
    }
    findOne(id)
  },[])

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
      id:values.id,
      name: values.name,
      email: values.email,
      avatar: values.avatar,
      password: values.password,
      status: values.status,
     }

    const response = await api.put(`/user/`,user,config)
    return toast.success(`${JSON.parse(response.config.data).name} - Atualizado com sucesso com sucesso`)
  } catch (error) {
    return toast.error(`Algo inesperado aconteceu => ${error}`)
  }
}

 
  return (
    <div>
      <ToastContainer />
      <h1>Atualizar Usuário</h1>
      <div className={classes.container}>
      <InputText icon={AccountCircle} onChange={onchange}  name={'name'} value ={values.name} type={'text'} label={"Nome do Cliente"} />
        <InputText icon={EmailRounded} onChange={onchange}  name={'email'} value ={values.email} type={'email'} label={"Email"} />
        <InputText icon={Lock} onChange={onchange}  name={'password'} value ={values.password} type={'password'} label={"Senha"} />
        <InputText icon={Lock} onChange={onchange}  name={'confirm'} value ={values.confirm} type={'password'} label={"Confirme a Senha"} />
        <Buton name={"Atualizar"}   icon={Save}  color={'primary'} cb ={update} />
      </div>
    </div>
  );
}
export default UpdateUsers;
