import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Dropdown from './Dropdown';

import {withRouter} from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    toggleMenu() {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    async onLogout() {
        try {
            const logoutStatus = await this.props.logout();

            if (logoutStatus === true) {
                this.props.history.push('/');
                this.props.history.go();
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {user} = this.props;
        const isLoggedIn = user !== null;
        const isMenuOpen = this.state.isMenuOpen;

        return (
            <nav className="bg-gray-800">
                <div className="max-w-full mx-auto px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center">
                                    <NavLink
                                        exact
                                        to="/"
                                        className="text-white">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                        </svg>
                                    </NavLink>
                                    {isLoggedIn &&
                                    <button type="button"
                                            className="sm:hidden ml-4 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                                            onClick={this.props.toggleCreateArticleModal}>
                                        <svg className="-ml-1 -mr-1 md:mr-2 h-5 w-5" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                    </button>
                                    }
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                                <NavLink
                                    exact
                                    to="/"
                                    activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/articles"
                                    activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Articles
                                </NavLink>
                                {isLoggedIn &&
                                <button type="button"
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                                        onClick={this.props.toggleCreateArticleModal}>
                                    <svg className="-ml-1 -mr-1 md:mr-2 h-5 w-5" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    <span className="hidden md:block">Create Article</span>
                                </button>
                                }
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex items-center">
                                {isLoggedIn &&
                                <div>
                                    <div className="text-sm font-medium text-gray-400">
                                        {user.name}
                                    </div>
                                </div>
                                }
                                {isLoggedIn &&
                                <Dropdown
                                    onLogout={this.onLogout}/>
                                }
                                {!isLoggedIn &&
                                <div className="flex items-center space-x-4">
                                    <NavLink
                                        exact
                                        to="/login"
                                        activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Log in
                                    </NavLink>
                                    <NavLink
                                        exact
                                        to="/register"
                                        as="button"
                                        type="button"
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                                        <span>Register</span>
                                    </NavLink>
                                </div>
                                }
                            </div>
                        </div>
                        <div className="-mr-2 flex sm:hidden">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-insest focus:ring-white"
                                aria-expanded="false"
                                onClick={this.toggleMenu}>
                            <span className="sr-only">
                                Open main menu
                            </span>
                                {isMenuOpen &&
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                }
                                {!isMenuOpen &&
                                <svg className="block w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16m-7 6h7"/>
                                </svg>
                                }
                            </button>
                        </div>
                    </div>
                    {isMenuOpen &&
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </NavLink>
                            {isLoggedIn &&
                            <div>
                                <NavLink
                                    exact
                                    to="/articles"
                                    activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Articles
                                </NavLink>
                            </div>
                            }
                            {!isLoggedIn &&
                            <div className="space-y-1">
                                <NavLink
                                    exact
                                    to="/login"
                                    activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                    Log in
                                </NavLink>
                                <button type="button"
                                        className="w-full text-left px-3 py-2 shadow-sm text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                                    <NavLink
                                        exact
                                        to="/register">
                                        <span>Register</span>
                                    </NavLink>
                                </button>
                            </div>
                            }
                        </div>
                        {isLoggedIn &&
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <NavLink
                                    exact
                                    to="/"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                    onClick={this.onLogout}>Log
                                    out</NavLink>
                            </div>
                        </div>
                        }
                    </div>
                    }
                </div>
            </nav>
        );
    }
}

export default withRouter(Nav);