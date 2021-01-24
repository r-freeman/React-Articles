import React from 'react';
import {Route, Switch} from 'react-router-dom';

// components
import Nav from 'components/Nav';

// pages
import Home from './pages/Home';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends React.Component {
    // instance variable
    API_URL = 'http://localhost:8000/api/';

    // pass props to constructor of App superclass (Component)
    constructor(props) {
        super(props);

        const user = localStorage.getItem('user')

        // when anything inside of state changes, the UI is re-rendered with most up-to-date version of state
        // also, UI refresh can be triggered programmatically by calling this.forceUpdate()
        this.state = {
            user,
            articles: [],
            categories: [],
            comments: []
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
        this.fetchArticles = this.fetchArticles.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    componentDidMount() {
        this.fetchArticles();
        this.fetchCategories();

        // const {user} = this.state;
        //
        // if (user !== null) {
        //     var myHeaders = new Headers();
        //     myHeaders.append("Accept", "application/json");
        //     myHeaders.append("Authorization", `Bearer ${user.api_token}`);
        //
        //     var requestOptions = {
        //         method: 'GET',
        //         headers: myHeaders
        //     };
        //
        //     fetch('http://localhost:8000/api/comments/1', requestOptions)
        //         .then(response => response.text())
        //         .then(result => console.log(result))
        //         .catch(error => console.log('error', error));
        //
        //     // try {
        //     //     await this.fetchComments();
        //     // } catch (e) {
        //     //     this.logout();
        //     // }
        // }
    }

    // fetchComments() {
    //     return new Promise((resolve, reject) => {
    //         let {user} = this.state;
    //
    //         fetch(`${this.API_URL}comments`, {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user.api_token}`
    //             }
    //         }).then((response) => {
    //             response.json()
    //                 .then(res => {
    //                     if (response.status === 200) {
    //                         let comments = res.data;
    //
    //                         this.setState({
    //                             comments
    //                         })
    //                         resolve(true);
    //                     } else {
    //                         reject(false);
    //                     }
    //                 })
    //         }).catch(err => reject(err));
    //     })
    // }

    fetchArticles() {
        fetch(`${this.API_URL}articles`)
            .then(res => res.json())
            .then(data => this.setState({
                articles: data
            }))
    }

    fetchCategories() {
        fetch(`${this.API_URL}categories`)
            .then(res => res.json())
            .then(data => this.setState({
                categories: data
            }))
    }

    login(email, password, remember_me) {
        return new Promise((resolve, reject) => {
            fetch(`${this.API_URL}login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"email": email, "password": password})
            }).then((response) => {
                response.json()
                    .then(res => {
                        if (response.status === 200) {
                            let user = res.data;

                            this.setState({
                                user
                            })

                            if (remember_me === true) {
                                localStorage.setItem('user', JSON.stringify(user));
                            }
                            resolve(true);
                        } else if (response.status === 422) {
                            reject(false);
                        }
                    })
            }).catch(err => {
                reject(err);
            });
        });
    }

    logout() {
        const {user} = this.state;

        fetch(`${this.API_URL}logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.api_token}`
            }
        }).then((response) => {
            response.json()
                .then(() => {
                    if (response.status === 200 || response.status === 401) {
                        localStorage.removeItem('user');

                        this.setState({
                            user: null
                        })
                    }
                })
        }).catch(err => console.log(err));
    }

    register() {

    }

    // the render method uses JSX syntax to output the UI as HTML
    // JavaScript expressions can be used in JSX using curly braces
    render() {
        return (
            <div className="App">
                <header>
                    <Nav user={this.state.user}
                         logout={this.logout}/>
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
                    <Route exact path='/articles/:id'
                           render={(props) =>
                               (<Article {...props} articles={this.state.articles}/>)}/>
                    <Route exact path='/login'>
                        <Login
                            user={this.state.user}
                            login={this.login}/>
                    </Route>
                    <Route exact path='/register'>
                        <Register
                            user={this.state.user}
                            register={this.register}/>
                    </Route>
                </Switch>
            </div>
        )
    }
}

// export the App class
export default App;