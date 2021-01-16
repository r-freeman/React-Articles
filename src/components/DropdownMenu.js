import {Transition} from '@headlessui/react';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="ml-3 relative">
            <button
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu" aria-haspopup="true"
                onFocus={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(!isOpen)}
            >
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full"
                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                     alt=""/>
            </button>
            <Transition
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu" aria-orientation="vertical" aria-labelledby="user-menu"
                show={isOpen}
                enter={"transition ease-out duration-100"}
                enterFrom={"transform opacity-0 scale-95"}
                enterTo={"transform opacity-100 scale-100"}
                leave={"transition ease-in duration-75"}
                leaveFrom={"transform opacity-100 scale-100"}
                leaveTo={"transform opacity-0 scale-95"}
            >
                <NavLink exact to="/"
                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         role="menuitem">Profile</NavLink>
                <NavLink exact to="/"
                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         role="menuitem">Settings</NavLink>
                <NavLink to="/logout"
                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         role="menuitem">Log out</NavLink>
            </Transition>
        </div>
    )
}

export default DropdownMenu;