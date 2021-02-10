import React  from 'react';
import List from "../../components/ListCustomers";


import './styles.css';



function listCostumers() {
 
  return (

  <div className='mainCcustomers' >
    <div className="titleCustomers">
    <h1>Lista Cliente</h1>
    </div>
    <List />
   
  </div>
    );
}

export default listCostumers;