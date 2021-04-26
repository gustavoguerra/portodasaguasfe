export interface ClienteViewModel {
    iD: number;
    razao_Social: string;
    cod_Cliente: number;
    id_Vendedor: number | null;
    nome_Cliente: string;
    telefone: string;
    cEP: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    status: boolean;
    data_Cadastro: string;
}