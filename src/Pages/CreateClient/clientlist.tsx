import React, { useEffect } from 'react'
import { Paper, Toolbar, TextField, InputAdornment, TableContainer, Table, TableRow, TableCell, TableHead, TableSortLabel, TableBody, TablePagination, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons'

import '../CreateClient/client.css'

const ClientList: React.FC = () => {

    useEffect(() => {
        setPage(0);
        setRowsPerPage(10);
        getByFilter(0, 10);
    }, []);


    const funcionario = 0 // useSelector((state: StoreState) => state.funcionario.dataByFilter);
    const dispatch = null //useDispatch();
    const totalrow = 0 //funcionario == undefined ? 0 : funcionario.totalItens
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const pages = [10, 25, 100]
    const func = []
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        getByFilter(newPage, rowsPerPage);
    };

    function getByFilter(nPage: number, nRowsPage: number) {
        // dispatch(funcionarioRequestByFilter({
        //     page: nPage + 1,
        //     itens: nRowsPage,
        //     filterType: '',
        //     filterValue: ''
        // }))
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        getByFilter(page, +event.target.value);
    };

    return (
        <div className="">
            <Paper className='funcionario_root'>
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
                            // onClick={() => ClienteSaveOrEdit()}
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
                                <TableCell>RG</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {funcionario?.listFuncionario.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell key={row.id}>{row.id}</TableCell>
                                        <TableCell>{row.nome}</TableCell>
                                        <TableCell>{row.rg}</TableCell>
                                        <TableCell>{row.cnpj_cpf}</TableCell>
                                        <TableCell>{row.telefone}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>Ativo</TableCell>
                                        <TableCell><button>Editar</button> | <button>Desativar</button></TableCell>
                                    </TableRow>
                                );
                            })} */}
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
        </div>
    )
}
export default ClientList;