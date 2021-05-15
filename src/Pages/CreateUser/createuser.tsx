import React, { useState } from 'react'
import {
    Button,
    LinearProgress,
    Box,
    CssBaseline,
    Container,
    Link
} from '@material-ui/core';

import Notify from '../../Components/Notificacao/notify'
import '../CreateUser/createuser.css'
import Copyright from '../../Components/Copyrigth/Copyright'
import { StringisNullOrEmpity } from '../../Helpers/helpers'
import { UserLoginDomain } from '../../Model/IUsuarioModel'
import axios from '../../Services/api'

import InputField from '../../Components/Objects/InputField/inputfield'

interface userError {
    firstName: boolean;
    lastName: boolean;
    socialNumber: boolean;
    cellPhoneNumber: boolean;
    email: boolean;
    userPassword: boolean;
    confirmPassword: boolean;
    loadinbar: boolean;
}

const CreateUser: React.FC = () => {

    const [items, setItems] = useState<UserLoginDomain>(Object);
    const [usererror, setusererror] = useState<userError>(Object);

    function Cadastrar() {
        if (!ValidadeUser()) {
            setItems({ ...items, systemId: Number(process.env.REACT_APP_SYSTEM_ID) })
            setusererror({ ...usererror, loadinbar: true })

            axios.login({
                url: '/User/createuser',
                method: 'post',
                data: JSON.stringify(items),
                headers: { 'Content-Type': 'application/json' }
            }).then(() => {
                Notify('success', 'Usuario cadastrado com sucesso !')
                setusererror({ ...usererror, loadinbar: false })
            }).catch(error => {
                Notify('error', error.response.data.message)
                setusererror({ ...usererror, loadinbar: false })
            })
        }
    }

    function ValidadeUser() {
        setusererror({
            ...usererror,
            firstName: StringisNullOrEmpity(items.firstName) ? true : false,
            lastName: StringisNullOrEmpity(items.lastName) ? true : false,
            socialNumber: StringisNullOrEmpity(items.socialNumber) ? true : false,
            cellPhoneNumber: StringisNullOrEmpity(items.cellPhoneNumber) ? true : false,
            email: StringisNullOrEmpity(items.email) ? true : false,
            userPassword: StringisNullOrEmpity(items.userPassword) ? true : false,
        })
        if (usererror.cellPhoneNumber ||
            usererror.confirmPassword ||
            usererror.email ||
            usererror.firstName ||
            usererror.lastName ||
            usererror.socialNumber ||
            usererror.userPassword || Object.keys(usererror).length == 0) {
            Notify('error', 'Favor preencha todos os campo obrigatorios !')
            return true
        }
        
    }

    function VeridicaPassword(value: string) {
        if (value !== items.userPassword) {
            setusererror({ ...usererror, confirmPassword: true })
        }
        else {
            setusererror({ ...usererror, confirmPassword: false })
        }
    }

    return (
        <div className="mais-container">
            <Notify />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <div className="title-register">
                        <label>Dados do Novo Usuario</label>
                    </div>

                    <form noValidate>
                        <InputField 
                            Required
                            RequiredText="Nome Obrigarotorio"
                            name="Nome" 
                            mask="TEXT"                              
                            onChange={e => setItems({ ...items, firstName: e.target.value })} />
                        <InputField 
                            Required
                            RequiredText="Sobrenome Obrigarotorio"
                            name="Sobrenome" 
                            mask="TEXT" 
                            onChange={e => setItems({ ...items, lastName: e.target.value })} />
                        <InputField 
                            Required
                            RequiredText="CPF Obrigarotorio"
                            name="CPF" 
                            mask="CPF" 
                            onChange={e => setItems({ ...items, socialNumber: e.target.value })} />
                        <InputField 
                            Required
                            RequiredText="Celular Obrigarotorio"
                            name="Celular" 
                            mask="CELLPHONE" 
                            onChange={e => setItems({ ...items, cellPhoneNumber: e.target.value })} />
                        <InputField 
                            Required
                            RequiredText="Email Obrigarotorio"
                            name="Email" 
                            mask="TEXT" 
                            onChange={e => setItems({ ...items, email: e.target.value })} />
                        <InputField 
                            Required
                            RequiredText="Password Obrigarotorio"
                            name="Password" 
                            type="password" 
                            mask="TEXT" 
                            onChange={e => setItems({ ...items, userPassword: e.target.value })} />
                        <InputField 
                            Required
                            name="Confirm Password" 
                            type="password" 
                            mask="TEXT" 
                            onBlur={e => VeridicaPassword(e.target.value)} />
                        
                        <div className="button-stayle">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => Cadastrar()}
                            >
                                Cadastrar
                                </Button>
                        </div>
                        <div className="loadin-bar">
                            {usererror.loadinbar && (<LinearProgress />)}
                        </div>
                    </form>
                </div>
                <div className="link-voltar">
                    <Link href="/" variant="body2">
                        {"Voltar para tela de login !"}
                    </Link>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}

export default CreateUser