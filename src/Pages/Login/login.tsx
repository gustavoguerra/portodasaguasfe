import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '../../store/createStore'
import { singInRequest } from '../../store/modules/auth/actions'
import { userLogin } from '../../store/modules/auth/types'
import RecoverPassword from '../RecoverPassword/recoverpassword'

import {
    Button,
    LinearProgress,
    Box,
    Link,
    Grid,
    TextField,
    CssBaseline,
    Avatar,
    Typography,
    Container,
    makeStyles
} from '@material-ui/core';

import { StringisNullOrEmpity } from '../../Helpers/helpers'
import Copyright from '../../Components/Copyrigth/Copyright'
import Notify from '../../Components/Notificacao/notify'

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
    const [modalVisible, setModalVisible] = useState(false);
    const history = useHistory();
    require('dotenv').config()
    if (statusLogin.error == true && start == false && !StringisNullOrEmpity(statusLogin.errorMessage)) {
        Notify('error', statusLogin.errorMessage)
        start = true;
    }

    if (statusLogin.isSingnedIn) {
        history.push('/dashboard');
    }

    function login() {
        items.systemId = Number(process.env.REACT_APP_SYSTEM_ID);

        if (StringisNullOrEmpity(items.password)) {
            Notify('error', 'Senha invalida !')
        }
        else if (StringisNullOrEmpity(items.username)) {
            Notify('error', 'Usuario invalido !')
        } else {
            dispatch(singInRequest(items))
            start = false;
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Notify />
                <Avatar className={classes.avatar}></Avatar>

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
                            <RecoverPassword />
                        </Grid>
                        <Grid item>
                            <Link href="/newuser" variant="body2">
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