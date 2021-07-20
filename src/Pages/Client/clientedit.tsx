import React, { useState } from 'react'

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
import { useHistory } from 'react-router-dom'

const ClientEdit: React.FC = () => {

    const [cliente, setCliente] = useState<ClienteViewModel>(Object);
    const [loadinbar, setLoadbar] = useState(false);
    const history = useHistory();
    function ConsultaCEP(cep: string) {
        if (cep.replace("-", "").length == 8) {
            axios.viaCep.get(cep.replace("-", "") + '/json').then(response => {
                setCliente({
                    ...cliente,
                    clienteCep: response.data.cep,
                    clienteRua: response.data.logradouro,
                    clienteBairro: response.data.bairro,
                    clienteCidade : response.data.localidade,
                    clienteEstado: response.data.uf
                })
            }).catch(error => {
                Notify('error', 'Erro ao consultar CEP');
            })
        }
    }

    async function ClienteSaveOrEdit() {
        setLoadbar(true);
        await Services.api.post('/Cliente/create', cliente)
        .then(response => {            
            Notify('success','Cliente salvo com sucesso!')
        }).catch(error => {
            if(error.response.status == 401){
                history.push('/');
            }
            else{
                Notify('error',String(error.response.data.message))
            }           
        })
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
                        mask="TEXT"
                        value={cliente.clienteNome}
                        onChange={e => setCliente({ ...cliente, clienteNome: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="CEP Obrigarotorio"
                        name="CEP"
                        mask="CEP"
                        value={cliente.clienteCep}
                        onChange={e => ConsultaCEP(e.currentTarget.value)} />
                    <InputField
                        Required
                        RequiredText="Rua Obrigatorio"
                        name="Rua"
                        mask="TEXT"
                        value={cliente.clienteRua}
                        onChange={e => setCliente({ ...cliente, clienteRua: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Numero Obrigarotorio"
                        name="Numero"
                        mask="TEXT"
                        value={cliente.clienteNumero}
                        onChange={e => setCliente({ ...cliente, clienteNumero: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Bairro Obrigatorio"
                        name="Bairro"
                        mask="TEXT"
                        value={cliente.clienteBairro}
                        onChange={e => setCliente({ ...cliente, clienteBairro: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Cidade Obrigarotorio"
                        name="Cidade"
                        mask="TEXT"
                        value={cliente.clienteCidade}
                        onChange={e => setCliente({ ...cliente, clienteCidade: e.currentTarget.value })} />
                    <InputField
                        Required
                        RequiredText="Estado Obrigarotorio"
                        name="Estado"
                        mask="TEXT"
                        value={cliente.clienteEstado}
                        onChange={e => setCliente({ ...cliente, clienteEstado: e.target.value })} />
                    <InputField
                        Required
                        RequiredText="Telefone Obrigarotorio"
                        name="Telefone"
                        mask="CELLPHONE"
                        value={cliente.clienteTelefone}
                        onChange={e => setCliente({ ...cliente, clienteTelefone: e.target.value })} />
                    <InputField
                        name="Email"
                        mask="TEXT"
                        value={cliente.clienteEmail}
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