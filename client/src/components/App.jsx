import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import HomePage from '../pages/HomePage.jsx'

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={HomePage} />
        </div>

    </BrowserRouter>

)
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated ? (
            <Component {...props}/>
        ): (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

export default App; 

