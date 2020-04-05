import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage.jsx'

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={HomePage} />
        </div>

    </BrowserRouter>

)

export default App; 

