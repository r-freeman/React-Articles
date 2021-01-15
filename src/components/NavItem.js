import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class NavItem extends Component {
    render() {
        const activeClass = "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";

        return (
            <NavLink to={`/${this.props.page.toLowerCase()}`}
                     activeClassName={activeClass}
                     className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {this.props.page}
            </NavLink>
        )
    }
}

export default NavItem;