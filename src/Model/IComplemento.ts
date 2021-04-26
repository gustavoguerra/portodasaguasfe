export interface EnderecoViewModel {
    id: number;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    ativo: boolean;
}


export interface InformacoesViewModel {
    id: number;
    nome: string;
    sobrenome: string;
    cnpjCpf: string;
    rg: string;
    email: string;
    numeroEndereco: string;
    telefone: string;
    orgaoEmissor: string;
    dataEmissao: string;
    passaporte: string;
    outrosDocumentos: string;
    tipoDocumento: string;
}