import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </Switch>
        )
    }
}

export default Routes;