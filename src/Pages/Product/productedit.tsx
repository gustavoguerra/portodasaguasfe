import React, { FormEvent, useCallback, useEffect, useState } from 'react'
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

    const [Produto, setProduto] = useState<ProdutoViewModel>({} as ProdutoViewModel);
    const [loadinbar, setLoadbar] = useState(false);
    const location = useLocation<ProdutoViewModel>();
    const history = useHistory();

    const hendleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
        let valor = e.currentTarget.value

        if (e.currentTarget.name == 'produtoValor') {
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d)(\d{2})$/, "$1.$2");
        }

        setProduto({
            ...Produto,
            [e.currentTarget.name]: valor
        })
    }, [Produto]);


    useEffect(() => {
        console.log(location.state)
        if (location.state !== undefined) {
            setProduto({ 
                id: location.state.id, 
                produtoNome: location.state.produtoNome,
                produtoValor: "0,00",
                produtoAtivo: location.state.produtoAtivo
            })
        }
    }, [location]);

    function ClearProduto() {

    }

    async function ProdutoSaveOrUpdate() {
        setLoadbar(true);
        if (Produto.id === 0 || Produto.id === undefined) {
            await axios.api.post('/Produto/create', Produto)
                .then(response => {
                    Notify('success', 'Produto salvo com sucesso!')
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
                    Notify('success', 'Produto atualizado com sucesso!')
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
                        Cabname="Nome"
                        name="produtoNome"
                        mask="TEXT"
                        value={Produto.produtoNome}
                        onChange={hendleChange}
                    />
                    <InputField
                        Required
                        RequiredText="Valor Obrigatorio"
                        name="produtoValor"
                        Cabname="Valor"
                        mask="REALCURRENCY"
                        value={Produto.produtoValor}
                        onChange={hendleChange}
                    />

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