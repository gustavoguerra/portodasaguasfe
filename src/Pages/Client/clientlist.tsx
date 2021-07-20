import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Services from '../../Services/api'
import Notfy from '../../Components/Notificacao/notify'

import { Paper, Toolbar, TextField, InputAdornment, TableContainer, Table, TableRow, TableCell, TableHead, TableSortLabel, TableBody, TablePagination, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons'

import {ClienteViewModel} from '../../Model/IClienteMdel'


import './client.css'

const ClientList: React.FC = () => {

    useEffect(() => {     
        setPage(0);
        setRowsPerPage(10);
        getByFilter(0, 10);
        GetAllClients();
    }, []);


    const [cliente, setCliente] = React.useState<ClienteViewModel[]>([])
    const totalrow = 0 //funcionario == undefined ? 0 : funcionario.totalItens
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const pages = [10, 25, 100]
    const history = useHistory();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        getByFilter(newPage, rowsPerPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        getByFilter(page, +event.target.value);
    };

    function getByFilter(nPage: number, nRowsPage: number) {
        // dispatch(funcionarioRequestByFilter({
        //     page: nPage + 1,
        //     itens: nRowsPage,
        //     filterType: '',
        //     filterValue: ''
        // }))
    }
    function ClienteNewOrEdit(){
        history.push('/clientedit');
    }

    async function GetAllClients() {
        await Services.api.get<ClienteViewModel[]>('/Cliente/GetAll')
        .then(response => {
            setCliente(response.data);
        }).catch(error => {
            if(error.response.status == 401){
                history.push('/');
            }
            else{
                Notfy('error',String(error.response.data.message))
            }  
        })
    }


    return (
        <Paper className='funcionario_root'>
            <div className='Text-title'>
                <label>Lista de Clientes</label>
            </div>
            <Toolbar>
                <div className="Aline-Toolbar">
                    <div>
                        <TextField
                            label="Pesquisar"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            href="/clientedit"
                           onClick={() => ClienteNewOrEdit()}
                        >Novo Cliente</Button>
                    </div>
                </div>
            </Toolbar>

            <TableContainer className='funcionario_container'>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell><TableSortLabel>ID</TableSortLabel></TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Rua</TableCell>
                            <TableCell>Bairro</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                         {cliente?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell key={row.id}>{row.id}</TableCell>
                                        <TableCell>{row.clienteNome}</TableCell>
                                        <TableCell>{row.clienteRua} - {row.clienteNumero}</TableCell>
                                        <TableCell>{row.clienteBairro}</TableCell>
                                        <TableCell>{row.clienteTelefone}</TableCell>
                                        <TableCell><Button color="primary" variant="contained">Editar</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={pages}
                component="div"
                count={totalrow}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>

    )
}
export default ClientList;