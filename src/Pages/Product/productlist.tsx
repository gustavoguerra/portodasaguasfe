import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Services from '../../Services/api'
import {
    Paper, Toolbar, TextField, InputAdornment, TableContainer, Table, TableRow, TableCell, TableHead, TableSortLabel, TableBody, TablePagination, Button,
    Icon,
    makeStyles
} from '@material-ui/core';
import { Search } from '@material-ui/icons'
import { ProdutoViewModel } from '../../Model/IProdutoModel'
import Notify from '../../Components/Notificacao/notify'
import './product.css'


const ProductList: React.FC = () => {

    useEffect(() => {
        setPage(0);
        setRowsPerPage(10);
        getByFilter(0, 10);
        GetAllClients();
    }, []);

    const [produto, setProduto] = React.useState<ProdutoViewModel[]>([])
    const totalrow = 0 //product == undefined ? 0 : product.totalItens
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
        // dispatch(productRequestByFilter({
        //     page: nPage + 1,
        //     itens: nRowsPage,
        //     filterType: '',
        //     filterValue: ''
        // }))
    }


    function ProdutoNew() {
        history.push('/productedit');
    }

    function ProdutoEdit(produto: ProdutoViewModel) {

    }
    async function GetAllClients() {
        await Services.api.get<ProdutoViewModel[]>('/Produto/GetAll')
            .then(response => {
                setProduto(response.data);
            }).catch(error => {
                if (error.response.status == 401) {
                    history.push('/');
                }
                else {
                    Notify('error', String(error.response.data.message))
                }
            })
    }

    return (
        <Paper className='funcionario_root'>
            <Notify />
            <div className='Text-title'>
                <label>Lista de Produto</label>
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
                            onClick={() => ProdutoNew()}
                        >Novo Produto</Button>
                    </div>
                </div>
            </Toolbar>

            <TableContainer className='funcionario_container'>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell><TableSortLabel>ID</TableSortLabel></TableCell>
                            <TableCell>Nome do Produto</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produto?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell key={row.id}>{row.id}</TableCell>
                                    <TableCell>{row.produtoNome}</TableCell>
                                    <TableCell>{row.produtoValor}</TableCell>
                                    <TableCell>{row.produtoAtivo}</TableCell>

                                    <TableCell><Button color="primary" variant="contained" onClick={() => ProdutoEdit(row)}>Editar</Button></TableCell>
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
export default ProductList;