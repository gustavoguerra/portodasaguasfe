import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import  { bindActionCreators, Dispatch } from 'redux'

// import { ApplicationState } from '../../store/index'
// import * as RepositoriesActions from   '../../store/ducks/repositories/actions'

// import  { Repository } from '../../store/ducks/repositories/types'

// interface StateProps {
//     repositories: Repository[]
    
// }

// interface DispatchProps {
//     loadRequest(): void;

// }

// type Props = StateProps & DispatchProps;


export default class Dashboard extends Component {

    componentDidMount(){
        // const { loadRequest } = this.props;
        // loadRequest()

    }

    render() {
        // const { repositories } = this.props;

        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                {/* <ul>
                    {repositories.map( cli => cli.nome)}
                </ul>
                */}
            </div>
        )
    }
}

// const mapStateToProps = (state: ApplicationState) => ({    
//     repositories: state.repositories.data
// });

// const mapDispatchToProps = (dispatch: Dispatch) => 
//     bindActionCreators(RepositoriesActions, dispatch);

// export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)

