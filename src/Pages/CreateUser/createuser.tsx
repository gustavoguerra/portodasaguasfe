import React, { Component } from 'react'

import Notify from '../../Components/Notificacao/notify'
import './'

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button, LinearProgress, Box, Link } from '@material-ui/core';



export default class CreateUser extends Component {

    state = {

    }
    render() {

        return (
            <div className="mais-container">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className=''>
                        <Notify />
                        <Typography component="h1" variant="h5">
                            Cadastro de Usuario
                        </Typography>
                        <form className='' noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="User Name"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className=''
                            >
                                Sign In
                    </Button>

                            {true && (<LinearProgress />)}

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Esqueci minha senha?
                            </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Não tem uma conta ? Cadastre-se"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        {/* <Copyright /> */}
                    </Box>
                </Container>
            </div>
        );
    }

}