export interface FuncionarioDTO {
    totalItens: number;
    totalPages: number;
    listFuncionario: Funcionario[];
}

export interface Funcionario {
    id: number;
    nome: string;
    rG: string;
    cnpj_cpf: string;
    email: string;
    telefone: string;
}