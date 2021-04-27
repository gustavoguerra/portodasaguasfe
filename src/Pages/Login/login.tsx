import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '../../store/createStore'
import { singInRequest } from '../../store/modules/auth/actions'

import { userLogin } from '../../store/modules/auth/types'

import Notify from '../../Components/Notificacao/notify'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button, LinearProgress, Box } from '@material-ui/core';

import { StringisNullOrEmpity } from '../../Helpers/helpers'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
let start = false;

const Login: React.FC = () => {

    const statusLogin = useSelector((state: StoreState) => state.auth);
    const [items, setItems] = useState<userLogin>(Object);
    const dispatch = useDispatch();
    const classes = useStyles();

    if (statusLogin.error == true && start == false) {
        Notify('error', statusLogin.errorMessage)
        start = true;
    }

    function login() {
        items.systemId = Number(process.env.REACT_APP_SYSTEM_ID);

        if (StringisNullOrEmpity(items.password)) {
            Notify('error', 'Senha invalida !')
        }
        else if(StringisNullOrEmpity(items.username)){
            Notify('error', 'Usuario invalido !')
        }else{
            dispatch(singInRequest(items))
            start = false;
        }
    }

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/gustavoguerra/user_login_api">
                    Luis Gustavo Guerra
            </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Notify />
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
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
                        onChange={e => setItems({ ...items, username: e.target.value })}
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
                        onChange={e => setItems({ ...items, password: e.target.value })}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => login()}
                    >
                        Sign In
                    </Button>

                    {statusLogin.loadingSingInRequest && (<LinearProgress />)}

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
                <Copyright />
            </Box>
        </Container>
    );
}

export default Login