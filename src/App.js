import React from 'react';
import {Route, Switch} from 'react-router-dom';

// components
import Nav from 'components/Nav';

// pages
import Home from './pages/Home';
import Articles from './pages/Articles';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends React.Component {
    // instance variable
    API_URL = 'http://localhost:8000/api/';

    // pass props to constructor of App superclass (Component)
    constructor(props) {
        super(props);

        // const user = localStorage.getItem('user')

        // when anything inside of state changes, the UI is re-rendered with most up-to-date version of state
        // also, UI refresh can be triggered programmatically by calling this.forceUpdate()
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

    // componentDidMount is a lifecycle method.
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

    // onLoginSuccess(loggedInUser, remember) {
    // must be bound in constructor
    // }

    // onLoginSuccess = (loggedInUser, remember) => {
    //     this refers an instance of the App class
    // }

    // the render method uses JSX syntax to output the UI as HTML
    // JavaScript expressions can be used in JSX using curly braces
    render() {
        return (
            <div className="App">
                <header>
                    <Nav user={this.state.user}/>
                </header>
                <Switch>
                    <Route exact path='/'>
                        <Home
                            articles={this.state.articles}
                            categories={this.state.categories}/>
                    </Route>
                    <Route exact path='/articles'>
                        <Articles
                            articles={this.state.articles}
                            categories={this.state.categories}/>
                    </Route>
                    <Route exact path='/login'>
                        <Login
                            user={this.state.user}/>
                    </Route>
                    <Route exact path='/register'>
                        <Register
                            user={this.state.user}/>
                    </Route>
                </Switch>
            </div>
        )
    }
}

// export the App class
export default App;