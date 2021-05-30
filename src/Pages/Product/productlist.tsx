import React, { useEffect } from 'react'
import {
    Paper, Toolbar, TextField, InputAdornment, TableContainer, Table, TableRow, TableCell, TableHead, TableSortLabel, TableBody, TablePagination, Button,
    Icon,
    makeStyles
} from '@material-ui/core';
import { Search } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

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
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        getByFilter(newPage, rowsPerPage);
    };

    function getByFilter(nPage: number, nRowsPage: number) {
        // dispatch(productRequestByFilter({
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
    const classes = useStyles();
    return (
        <div className="">

            <Paper className='product_root'>
                <Toolbar>
                    <TextField
                        label="Pesquisar"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        // endIcon={<Icon>Email</Icon>}
                    >Novo Produto</Button>
                </Toolbar>

                <TableContainer className='product_container'>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                <TableCell><TableSortLabel>ID</TableSortLabel></TableCell>
                                <TableCell>Descrição</TableCell>
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
        </div>
    )
}
export default ProductList;