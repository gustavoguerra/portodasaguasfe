import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Menus from './Components/MenusBar/menus'

import Login from './Pages/Login/login'
import CreateUser from './Pages/CreateUser/createuser'
import Dashboard from './Pages/Dashboard/dashboard'
import ClientList from './Pages/CreateClient/clientlist'
import ClientEdit from './Pages/CreateClient/clientedit'

import './CSS/layout.css'

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/newuser" component={CreateUser} />

            <Menus>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/clientlist" component={ClientList} />
                <Route exact path="/clientedit" component={ClientEdit} />
            </Menus>
        </Switch>
    )
}