import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { singInValidate } from '../../store/modules/auth/actions'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { StoreState } from '../../store/createStore';
import { StringisNullOrEmpity } from '../../Helpers/helpers'

interface IRouterProps {
    exact?: boolean;
    path: string
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<IRouterProps> = ({ component: Component, ...rest }) => {
    const statusLogin = useSelector((state: StoreState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => { 
        if (!statusLogin.isSingnedIn && (StringisNullOrEmpity(localStorage.getItem('TOKEN')))) {         
           dispatch(singInValidate())
        }
    },[]);

    function validateToken(props: RouteComponentProps) {
        if (!StringisNullOrEmpity(localStorage.getItem('TOKEN'))) {
            return <Component to={{ pathname: '/dashboard', state: { from: props.location } }} />
        } else if (!statusLogin.isSingnedIn && StringisNullOrEmpity(localStorage.getItem('TOKEN'))) {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
    }
    return (
        <Route {...rest} render={props => (validateToken(props))} />
    )
}

export default PrivateRoute;
