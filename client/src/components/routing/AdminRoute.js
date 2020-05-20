import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from "../../context/auth/authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading, role } = authContext;

    return (
        <Route {...rest} render={props => (!isAuthenticated || role !== "admin") && !loading ? (
            <Redirect to='/' />
        ) : (
            <Component {...props} />
        )
        }
        />
    )
};

export default AdminRoute;