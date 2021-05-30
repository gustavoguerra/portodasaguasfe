import React, { useState } from 'react'

import Notify from '../../Components/Notificacao/notify'
import InputField from '../../Components/Objects/InputField/inputfield'
import { ClienteViewModel } from '../../Model/IClienteMdel'

import {
    Button,
    LinearProgress,
    Box,
    CssBaseline,
    Container,
    Link
} from '@material-ui/core';



const ClientEdit: React.FC = () => {

    const [cliente, setCliente] = useState<ClienteViewModel>(Object);
    const [loadinbar, setLoadbar] = useState(false);

    function ClienteSaveOrEdit() {
        setLoadbar(true);
    }

    return (
        <div>
            <Notify />
            <Container component="main" maxWidth="xs">
                <div className="title-register">
                    <label>Dados do Novo Usuario</label>
                </div>

                <form noValidate>
                    <InputField
                        Required
                        RequiredText="Nome Obrigarotorio"
                        name="Nome"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, clineteNome: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="CEP Obrigarotorio"
                        name="CEP"
                        mask="CEP"
                        onChange={e => setCliente({ ...cliente, clienteCep: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="Rua Obrigatorio"
                        name="Rua"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, clienteRua: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="Numero Obrigarotorio"
                        name="Numero"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, clienteNumero: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="Bairro Obrigatorio"
                        name="Bairro"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, clienteBairro: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="Cidade Obrigarotorio"
                        name="Cidade"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, clienteCidade: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="Estado Obrigarotorio"
                        name="Estado"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, clienteEstado: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="Telefone Obrigarotorio"
                        name="Telefone"
                        mask="CELLPHONE"
                        onChange={e => setCliente({ ...cliente, clienteTelefone: e.target.value })} />
                    <InputField
                        name="Email"
                        mask="TEXT"
                        onChange={e => setCliente({ ...cliente, clienteEmail: e.target.value })} />

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

export default ClientEdit;