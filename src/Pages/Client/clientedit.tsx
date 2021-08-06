import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from '../../Services/api'
import Services from '../../Services/api'
import Notify from '../../Components/Notificacao/notify'
import InputField from '../../Components/Objects/InputField/inputfield'
import { ClienteViewModel } from '../../Model/IClienteMdel'

import {
    Button,
    LinearProgress,
    Container
} from '@material-ui/core';

const ClientEdit: React.FC = () => {

    const [cliente, setCliente] = useState<ClienteViewModel>(Object);
    const [loadinbar, setLoadbar] = useState(false);
    const history = useHistory();
    const location = useLocation<ClienteViewModel>();

    useEffect(() => {
        if (location.state !== undefined) {
            setCliente(location.state)
        }
    }, [location]);

    function ConsultaCEP(cep: string) {
        if (cep.replace("-", "").length == 8) {
            axios.viaCep.get(cep.replace("-", "") + '/json').then(response => {
                setCliente({
                    ...cliente,
                    clienteCep: response.data.cep,
                    clienteRua: response.data.logradouro,
                    clienteBairro: response.data.bairro,
                    clienteCidade: response.data.localidade,
                    clienteEstado: response.data.uf
                })
            }).catch(error => {
                Notify('error', 'Erro ao consultar CEP');
            })
        }
    }

    function ClearCliente() {
        setCliente({
            id: 0,
            clienteNome: '',
            clienteCep: '',
            clienteRua: '',
            clienteNumero: '',
            clienteBairro: '',
            clienteEstado: '',
            clienteCidade: '',
            clienteEmail: '',
            clienteTelefone: ''
        });
    }

    async function ClienteSaveOrEdit() {
        setLoadbar(true);
        if (cliente.id == 0) {
            await Services.api.post('/Cliente/create', cliente)
                .then(response => {
                    Notify('success', 'Cliente salvo com sucesso!')
                    ClearCliente();
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
            await Services.api.put('/Cliente/Update', cliente)
                .then(response => {
                    Notify('success', 'Cliente atualizado com sucesso!')
                    ClearCliente();
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
                    <label>Dados do Cliente</label>
                </div>

                <form noValidate>
                    <InputField                        
                        Required
                        RequiredText="Nome Obrigarotorio"
                        name="Nome"
                        Cabname="Nome"
                        mask="TEXT"
                        value={cliente.clienteNome}
                        onKeyUp={e => setCliente({ ...cliente, clienteNome: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="CEP Obrigarotorio"
                        name="CEP"
                        Cabname="CEP"
                        mask="CEP"
                        value={cliente.clienteCep}
                        onKeyUp={e => ConsultaCEP(e.currentTarget.value)} />
                    <InputField
                        Required
                        RequiredText="Rua Obrigatorio"
                        name="Rua"
                        Cabname="Rua"
                        mask="TEXT"
                        value={cliente.clienteRua}
                        onKeyUp={e => setCliente({ ...cliente, clienteRua: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Numero Obrigarotorio"
                        name="Numero"
                        Cabname="Numero"
                        mask="TEXT"
                        value={cliente.clienteNumero}
                        onKeyUp={e => setCliente({ ...cliente, clienteNumero: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Bairro Obrigatorio"
                        name="Bairro"
                        Cabname="Bairro"
                        mask="TEXT"
                        value={cliente.clienteBairro}
                        onKeyUp={e => setCliente({ ...cliente, clienteBairro: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Cidade Obrigarotorio"
                        name="Cidade"
                        Cabname="Cidade"
                        mask="TEXT"
                        value={cliente.clienteCidade}
                        onKeyUp={e => setCliente({ ...cliente, clienteCidade: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Estado Obrigarotorio"
                        name="Estado"
                        Cabname="Estado"
                        mask="TEXT"
                        value={cliente.clienteEstado}
                        onKeyUp={e => setCliente({ ...cliente, clienteEstado: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Telefone Obrigarotorio"
                        name="Telefone"
                        Cabname="Telefone"
                        mask="CELLPHONE"
                        value={cliente.clienteTelefone}
                        onKeyUp={e => setCliente({ ...cliente, clienteTelefone: e.currentTarget.value })} />
                    <InputField
                        name="Email"
                        Cabname="Email"
                        mask="TEXT"
                        value={cliente.clienteEmail}
                        onKeyUp={e => setCliente({ ...cliente, clienteEmail: e.currentTarget.value })} />

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