import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './Components/Router/RouterAuthenticate'

import Menus from './Components/MenusBar/menus'

import Login from './Pages/Login/login'
import CreateUser from './Pages/CreateUser/createuser'
import Dashboard from './Pages/Dashboard/dashboard'
import ClientList from './Pages/Client/clientlist'
import ClientEdit from './Pages/Client/clientedit'
import ProductList from './Pages/Product/productlist'
import ProductEdit from './Pages/Product/productedit'

import './CSS/layout.css'

export default function Routes() {

    //Usar esse video para fazer a autenticação de rotas    
    //https://www.youtube.com/watch?v=sYe4r8WXGQg
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/newuser" component={CreateUser} />
            <Menus>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/clientlist" component={ClientList} />
                <PrivateRoute exact path="/clientedit" component={ClientEdit} />
                <PrivateRoute exact path="/productlist" component={ProductList} />
                <PrivateRoute exact path="/productedit" component={ProductEdit} />
            </Menus>
        </Switch>
    )
}