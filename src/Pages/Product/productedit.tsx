import React, { useEffect, useState } from 'react'

import Notify from '../../Components/Notificacao/notify'
import InputField from '../../Components/Objects/InputField/inputfield'

import { ProdutoViewModel } from '../../Model/IProdutoModel'

import {
    Button,
    LinearProgress,
    Container,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

const ProductEdit: React.FC = () => {

    const [cliente, setCliente] = useState<ProdutoViewModel>(Object);
    const [loadinbar, setLoadbar] = useState(false);

    function ClienteSaveOrEdit() {
        setLoadbar(true);
    }

    return (
        <div>
            <Notify />
            <Container component="main" maxWidth="xs">
                <div className="title-register">
                    <label>Dados do Usuario</label>
                </div>

                <form noValidate>
                    <InputField
                        Required
                        RequiredText="Nome Obrigarotorio"
                        name="Nome"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, produtoNome: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="CEP Obrigarotorio"
                        name="CEP"
                        mask="CEP"
                        onChange={e => setCliente({ ...cliente, produtoValor: e.target.value })} />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Produto Ativo?"
                    />


                    <div className="button-stayle">
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => ClienteSaveOrEdit()}
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