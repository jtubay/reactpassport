import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'

import DashboardPage from '../pages/DashboardPage.jsx'
import auth from '../utils/auth'

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={LoginPage} />      
            <PrivateRoute path='/dashboard' component={DashboardPage} />
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

