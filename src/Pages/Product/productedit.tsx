import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import Notify from '../../Components/Notificacao/notify'
import axios from '../../Services/api'
import InputField from '../../Components/Objects/InputField/inputfield'
import {
    Button,
    LinearProgress,
    Container,
    withStyles,
    Typography,
    Switch,
    Grid
} from '@material-ui/core';
import { ProdutoViewModel } from '../../Model/IProdutoModel'


const ProductEdit: React.FC = () => {

    const AntSwitch = withStyles((theme: any) => ({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }))(Switch);
    const [Produto, setProduto] = useState<ProdutoViewModel>(Object);
    const [loadinbar, setLoadbar] = useState(false);
    const location = useLocation<ProdutoViewModel>();
    const history = useHistory();

    useEffect(() => {
        if (location.state !== undefined) {
            setProduto(location.state)
        }
    }, [location]);

    function ClearProduto() {
        
    }
    async function ProdutoSaveOrUpdate() {

        setLoadbar(true);
        if (Produto.id == 0) {
            await axios.api.post('/Produto/create', Produto)
                .then(response => {
                    Notify('success', 'Cliente salvo com sucesso!')
                    ClearProduto();
                }).catch(error => {
                    if (error.response.status == 401) {
                        history.push('/');
                    }
                    else {
                        Notify('error', String(error.response.data.message))
                    }
                })
        }
        else {
            await axios.api.put('/Produto/Update', Produto)
                .then(response => {
                    Notify('success', 'Cliente atualizado com sucesso!')
                    ClearProduto();
                }).catch(error => {
                    if (error.response.status == 401) {
                        history.push('/');
                    }
                    else {
                        Notify('error', String(error.response.data.message))
                    }
                })
        }
        setLoadbar(false);
    }

    return (
        <div>
            <Notify />
            <Container component="main" maxWidth="xs">
                <div className="title-register">
                    <label>Dados do Produto</label>
                </div>

                <form noValidate>
                    <InputField
                        Required
                        RequiredText="Nome Produto Obrigarotorio"
                        name="Produto"
                        mask="TEXT"
                        value={Produto.produtoNome}
                        onChange={e => setProduto({ ...Produto, produtoNome: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Valor Obrigatorio"
                        name="Valor"
                        mask="REALCURRENCY"
                        value={Produto.produtoValor}
                        onChange={e => setProduto({ ...Produto, produtoValor: e.currentTarget.value })} />

                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Desativado</Grid>
                            <Grid item>
                                <AntSwitch checked={Produto.produtoAtivo} onChange={e => setProduto({ ...Produto, produtoAtivo: e.target.checked })} name="checked" />
                            </Grid>
                            <Grid item>Ativado</Grid>
                        </Grid>
                    </Typography>

                    <div className="button-stayle">
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => ProdutoSaveOrUpdate()}
                        >
                            Salvar
                        </Button>
                    </div>
                    <div className="loadin-bar">
                        {loadinbar && (<LinearProgress />)}
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default ProductEdit;