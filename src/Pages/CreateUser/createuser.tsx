import React, { useState } from 'react'
import {
    Button,
    LinearProgress,
    Box,
    TextField,
    CssBaseline,
    Container,
    Link,
} from '@material-ui/core';

import Notify from '../../Components/Notificacao/notify'
import '../CreateUser/createuser.css'
import Copyright from '../../Components/Copyrigth/Copyright'
import { StringisNullOrEmpity } from '../../Helpers/helpers'
import { UserLoginDomain } from '../../Model/IUsuarioModel'
import axios from '../../Services/api'


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
       
        if(!ValidadeUser()){

            setItems({...items, systemId: Number(process.env.REACT_APP_SYSTEM_ID)})
            setusererror({ ...usererror, loadinbar: true })         
            
            axios.login({
                url: '/User/createuser',
                method: 'post',
                data: JSON.stringify(items),
                headers: {'Content-Type': 'application/json'}
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
            usererror.userPassword || Object.keys(usererror).length  == 0) {
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
                <div className=''>
                    <div className="title-register">
                        <label>Dados do Novo Usuario</label>
                    </div>

                    <form className='' noValidate>
                        <TextField
                            error={usererror.firstName}
                            helperText={usererror.firstName ? 'Nome Obrigatorio !' : ''}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Nome"
                            label="Nome"
                            name="Nome"
                            autoComplete="Nome"
                            onChange={e => setItems({ ...items, firstName: e.target.value })}
                            color="primary"
                            autoFocus
                        />
                        <TextField
                            error={usererror.lastName}
                            helperText={usererror.lastName ? 'Sobrenome Obrigatorio !' : ''}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Sobrenome"
                            label="Sobrenome"
                            name="Sobrenome"
                            autoComplete="Sobrenome"
                            onChange={e => setItems({ ...items, lastName: e.target.value })}
                        />
                        <TextField
                            error={usererror.socialNumber}
                            helperText={usererror.socialNumber ? 'CPF Obrigatorio !' : ''}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="CPF"
                            label="CPF"
                            name="CPF"
                            autoComplete="CPF"
                            onChange={e => setItems({ ...items, socialNumber: e.target.value })}
                        />
                        <TextField
                            error={usererror.cellPhoneNumber}
                            helperText={usererror.cellPhoneNumber ? 'Celular Obrigatorio !' : ''}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Celular"
                            label="Celular"
                            name="Celular"
                            autoComplete="Celular"
                            onChange={e => setItems({ ...items, cellPhoneNumber: e.target.value })}
                        />
                        <TextField
                            error={usererror.email}
                            helperText={usererror.email ? 'Email Obrigatorio !' : ''}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Email"
                            label="Email"
                            name="Email"
                            autoComplete="Email"
                            onChange={e => setItems({ ...items, email: e.target.value })}
                        />
                        <TextField
                            error={usererror.userPassword}
                            helperText={usererror.userPassword ? 'Password Obrigatorio !' : ''}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={e => setItems({ ...items, userPassword: e.target.value })}
                            autoComplete="current-password"
                        />
                        <TextField
                            error={usererror.confirmPassword}
                            helperText={usererror.confirmPassword ? 'Password não confere !' : ''}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Confpassword"
                            label="Confirm Password"
                            type="password"
                            id="Confpassword"
                            autoComplete="current-password"
                            onBlur={e => VeridicaPassword(e.target.value)}
                        />
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