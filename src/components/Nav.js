import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import NavItem from './NavItem';

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
        const pages = ['Login', 'Register'];

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
                            <div className="flex-shrink-0 flex items-center">
                                <NavLink to="/" className="text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                    </svg>
                                </NavLink>
                            </div>
                            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                {
                                    pages.map(page => (
                                        <NavItem page={page}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;