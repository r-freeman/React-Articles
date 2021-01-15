import {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }

        this.setIsOpen = this.setIsOpen.bind(this);
    }

    setIsOpen() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        const isOpen = this.state.isOpen;

        return (
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="-ml-2 mr-2 flex items-center md:hidden">
                                <button onClick={this.setIsOpen}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        aria-expanded="false">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>

                                    {isOpen &&
                                    <svg className="block h-6 w-6"
                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                    }
                                    {!isOpen &&
                                    <svg className="block h-6 w-6"
                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                    }
                                </button>
                            </div>


                            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                <Link
                                    to="/"
                                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;