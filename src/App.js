import React from 'react';
import {Route, Switch} from 'react-router-dom';

// components
import Nav from 'components/Nav';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends React.Component {
    API_URL = 'http://localhost:8000/api/'

    constructor(props) {
        super(props);

        // const user = localStorage.getItem('user')
        this.state = {
            user: {
                "id": 1,
                "name": "administrator",
                "email": "admin@test.com",
                "email_verified_at": null,
                "created_at": "2021-01-05T13:43:16.000000Z",
                "updated_at": "2021-01-16T21:50:06.000000Z",
                "api_token": "CBpr0miB67ZLcsIJ8MwxwNfdRONSAiTMUYy7NY58yrnBayL2k7tAatuusvVD"
            },
            articles: [],
            categories: []
        }
    }

    componentDidMount() {
        // fetch articles
        fetch(`${this.API_URL}articles`)
            .then(res => res.json())
            .then(data => this.setState({
                articles: data
            }))

        // fetch categories
        fetch(`${this.API_URL}categories`)
            .then(res => res.json())
            .then(data => this.setState({
                categories: data
            }))
    }

    render() {
        return (
            <div className="App">
                <header>
                    <Nav user={this.state.user}/>
                </header>
                <Switch>
                    <Route exact path='/'
                           render={() => <Home articles={this.state.articles}/>}/>
                    <Route exact path='/login'
                           render={() => <Login user={this.state.user}/>}/>
                    <Route exact path='/register'
                           render={() => <Register user={this.state.user}/>}/>
                </Switch>
            </div>
        )
    }
}

export default App;