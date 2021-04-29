import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link, TextField, Button, Avatar, Typography, Container, CssBaseline, CircularProgress  } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';

import axios from '../../Services/api'
import Notify from '../../Components/Notificacao/notify'
import { StringisNullOrEmpity } from '../../Helpers/helpers'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 14px 0 rgba(0,0,0, 0.02)',
        padding: theme.spacing(2, 4, 3),
        borderRadius: '5px',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        color: '#fff',
        backgroundColor: 'green',
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    button_style: {
        marginTop: '25px'
    },
    fabProgress: {
        color: 'blue',
        position: 'absolute',
        top: -3,
        left: -3,
        zIndex: 0,
      },
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [loading, setloading] = React.useState(false);
    const [emailerror, setEmailError] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const sendEmail = () => {

        if (!StringisNullOrEmpity(email)) {
            setloading(true)
            let json = {
                SystemId: Number(process.env.REACT_APP_SYSTEM_ID),
                Email: email
            }
            axios.login({
                url: '/User/recoverpassword',
                method: 'post',
                data: JSON.stringify(json),
                headers: { 'Content-Type': 'application/json' }
            }).then(() => {
                Notify('success', 'Solicitação efetuada !')
                setloading(false)
            }).catch(error => {
                Notify('error', error.response.data.message)
                setloading(false)
            })
            setEmail("");
        }
        else {
            setEmailError(true);
        }
    }


    return (
        <div>
            <Link href="#" onClick={() => setOpen(true)} variant="body2">
                Esqueci minha senha?
            </Link>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <EmailIcon />
                                {loading && <CircularProgress size={54} className={classes.fabProgress} />}
                            </Avatar>
                            <Typography component="h1" variant="h5">Recuperar Password</Typography>

                            <TextField
                                error={emailerror}
                                helperText={emailerror ? 'Email invalido' : ''}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email de Recuperação"
                                name="email"
                                autoComplete="email"
                                onChange={e => setEmail(e.target.value)}
                                onClick={() => setEmailError(false)}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button_style}
                                onClick={() => sendEmail()}
                            >
                                Recuperar Password
                            </Button>

                        </div>



                    </Container>
                </Fade>
            </Modal>
        </div>
    );
}