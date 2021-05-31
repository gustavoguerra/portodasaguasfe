import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import {
    Paper, Toolbar, TextField, InputAdornment, TableContainer, Table, TableRow, TableCell, TableHead, TableSortLabel, TableBody, TablePagination, Button,
    Icon,
    makeStyles
} from '@material-ui/core';
import { Search } from '@material-ui/icons'
import './product.css'

import './product.css'



const ProductList: React.FC = () => {

    useEffect(() => {
        setPage(0);
        setRowsPerPage(10);
        getByFilter(0, 10);
    }, []);

    const product = 0 // useSelector((state: StoreState) => state.product.dataByFilter);
    const dispatch = null //useDispatch();
    const totalrow = 0 //product == undefined ? 0 : product.totalItens
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const pages = [10, 25, 100]
    const func = []
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

    function ProductNewOrEdit() {
        history.push('/productedit');
    }

    return (

        <Paper className='product_root'>
            <div className='Text-title'>
                <label>Lista de Produtos</label>
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
                            href="/productedit"
                            onClick={() => ProductNewOrEdit()}
                        >Novo Produto</Button>
                    </div>
                </div>
            </Toolbar>

            <TableContainer className='product_container'>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell><TableSortLabel>ID</TableSortLabel></TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {product?.listproduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
    )
}
export default ProductList;