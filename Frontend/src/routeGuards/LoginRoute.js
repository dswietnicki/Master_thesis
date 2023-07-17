import React from 'react';
import { Route, Redirect } from "react-router-dom";

const LoginRoute = ({ component: Component, authed, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            !authed
                ? <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
}

export default LoginRoute;