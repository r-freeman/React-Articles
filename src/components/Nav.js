import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        }

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    render() {
        const isLoggedIn = true;
        const isMenuOpen = this.state.isMenuOpen;
        const pages = [
            {
                "title": "Log in",
                "link": "login",
            },
            {
                "title": "Register",
                "link": "register"
            }
        ];

        return (
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <NavLink exact to="/" className="text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                    </svg>
                                </NavLink>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex items-center">
                                {isLoggedIn &&
                                <DropdownMenu/>
                                }
                                {!isLoggedIn &&
                                <div className="flex items-center space-x-4">
                                    {
                                        pages.map(page => (
                                            <NavItem title={page.title} link={page.link}/>
                                        ))
                                    }
                                </div>
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