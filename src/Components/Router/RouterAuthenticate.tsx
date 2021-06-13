import react from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router'
import { StoreState } from '../../store/createStore';

const PrivateRoute: React.FC<any> = ({ Component, ...rest }) => {

    const statusLogin = useSelector((state: StoreState) => state.auth);
    console.log(statusLogin)
    return (
        <Route {...rest} render={props => (
           // statusLogin.isSingnedIn ? (<Component {...props} />) : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
           statusLogin.isSingnedIn ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />) : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        )} />
    )
}

export default PrivateRoute;