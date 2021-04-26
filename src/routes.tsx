import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './Pages/Login/login'

import './CSS/layout.css'

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            {/* <div className="box-container">
                <div className="nav-bar">
                    <NavBar></NavBar>
                </div>
                <div className="main-page">

                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/editarfuncionario" component={EditarFuncionario} />
                    <Route exact path="/Funcionario" component={ListaFuncionarios} />
                </div>
            </div> */}
        </Switch>
    )  
}