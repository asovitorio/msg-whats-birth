import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Header from "./components/Nav";
import ListCostumers from "./Pages/ListCostumers"
import AddCostumers from "./Pages/AddCostumers"
import ListUsers from "./Pages/ListUsers"
import AddUsers from "./Pages/AddUsers"
import UpdateCustomers from "./Pages/UpdateCustomers"
import UpdateUsers from "./Pages/UpdateUsers"
import ConfigWhatsApp from "./Pages/ConfigWhatsApp"



  

function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
              <Login />
          </Route>
          <Route exact path="/home">
             <Header page={<Home page={<ListCostumers />} />} />
          </Route>
          <Route exact path= "/customers-create">
             <Header exact page={<Home page={<AddCostumers />} />} />
          </Route>
          <Route exact path="/users-list">
             <Header page={<Home page={<ListUsers />} />} />
          </Route>
          <Route exact  path="/users-create">
             <Header page={<Home page={<AddUsers />} />} />
          </Route>
          <Route exact path="/customer-update/:id">
             <Header  page={<Home page={<UpdateCustomers />} />} />
          </Route>
          <Route exact path="/user-update/:id">
             <Header  page={<Home page={<UpdateUsers />} />} />
          </Route>
          <Route exact path="/config-whatsApp">
             <Header  page={<Home page={<ConfigWhatsApp />} />} />
          </Route>
        </Switch>
      </Router>
     
    </>
  );
}

export default Routes;
