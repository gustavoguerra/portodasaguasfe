export interface FuncionarioViewModel {
    id: number;
    idEndereco: number;
    //endereco: EnderecoViewModel;
    idInformacaoAdicional: number;
    //dadosPessoais: InformacoesViewModel;
    paisNascimento: string;
    dataNascimento: string;
    formacao: string;
    curriculoDoc: string;
    curriculoLink: string;
    linkedins: string;
    sexo: string;
    nomeBanco: string;
    agencia: string;
    numeroConta: string;
    ativo: boolean;
}