import React, { useState } from 'react';
import InputWhatsApp from "../../components/InputText";
import Buton from "../../components/Button";
import api from '../../api/endpoint'
import { toast, ToastContainer } from 'react-toastify';
import {WhatsApp,Send} from "@material-ui/icons/"
import {useHistory} from 'react-router-dom'

function ConfigWhatsApp() {

  const [value,setValue] = useState('')
const history = useHistory()
    const onchange =(e) => setValue(e.target.value)
    const config = async (e) =>{
       
        try {
            e.preventDefault();
            const {token} = JSON.parse(localStorage.getItem('user'))
            let config ={
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              }
              const response = await api.get(`/config/${value}`,config)
              console.log(response)
              toast.success('WhatsApp configurado!')
              if(response) return setTimeout(() => {
                  history.push('/home')
              }, 6000);
             
        } catch (error) {
            return toast.error('Não foi possivel Configurar')
        }
    }
    
  return (
      <div>
          <ToastContainer />
          <h1>Configuração WhatsApp</h1>
          <InputWhatsApp icon={WhatsApp} onChange={onchange}  name={'whatsApp'} value ={value} type={'phone'} label={'Telefone - WhatsApp'}/>
          <Buton name={"Enviar"}   icon={Send}  color={'primary'} cb ={config} />
      </div>
  );
}

export default ConfigWhatsApp;