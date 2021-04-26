// import React, {Component} from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators, Dispatch } from 'redux'

// import { Repository } from '../store/ducks/Repositorys/types'
// import * as RepositoriesActions  from '../store/ducks/Repositorys/actions'
// import  store, { ApplicationsState } from '../store'

// interface StateProps {
//     repository: Repository[]
// }

// interface DispatchProps {
//     loadRequest(): void
// }


// type Props = StateProps & DispatchProps; 


// class RepositoryFuncionario extends Component<Props> {    
//     componentDidMount(){
//         const { loadRequest } = this.props;

//         loadRequest()
//     }


//     renter() {
//         const {repository} = this.props
//         return (
//         <ul> {repository.map(reposito => reposito.nome_Cliente)}</ul>
//         )
//     }

// }


// const mapStatetoProps = (state: ApplicationsState) => ({
//     repository: state.repository.data,
// })

// const mapDispatchToProps = (dispatch: Dispatch) => 
//         bindActionCreators(RepositoriesActions, dispatch);

// export default connect(mapStatetoProps)(RepositoryFuncionario);



import React, {Component} from 'react'

import { FuncionarioViewModel } from '../../Model/IFuncionario'

interface PropsFuncionario {
    listFuncionario: FuncionarioViewModel[];
    funcionario: FuncionarioViewModel;
}

export default class Repository extends Component<PropsFuncionario> {    
    
    state = {
        listCliente: this.props.listFuncionario,
        cliente: this.props.funcionario
    }

    renter() {
        return (
        <h1>{}</h1>
        )
    }

}