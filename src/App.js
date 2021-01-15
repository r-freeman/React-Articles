import React from 'react';
import Routes from './Routes';
import Nav from 'components/Nav';

class App extends React.Component {
    API_URL = 'http://localhost:8000/api/'

    constructor(props) {
        super(props);

        const user = localStorage.getItem('user')
        this.state = {
            user,
            articles: [],
            categories: []
        }
    }

    async componentDidMount() {
        // fetch articles, categories here

    }

    render() {
        return (
            <div className="App">
                <header>
                    <Nav/>
                </header>
                <Routes/>
            </div>
        )
    }
}

export default App;