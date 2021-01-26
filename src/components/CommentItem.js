import React from 'react';
import DayJS from 'react-dayjs';
import {Transition} from '@headlessui/react';

class CommentItem extends React.Component {
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
        const {isMenuOpen} = this.state;
        const {comment, user} = this.props;
        const hasPermission = comment.user_id === user.id;

        return (
            <div className="flex mt-8 group">
                <div className="mr-4 flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        className="h-12 w-12 rounded-full"/>
                </div>
                <div className="-mt-1 space-y-2">
                    <div className="flex justify-between">
                        <h4
                            className="text-sm font-semibold">Lorem ipsum</h4>
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    className="flex items-center text-gray-400 hover:text-gray-600 opacity-100 lg:opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    id="options-menu" aria-haspopup="true" aria-expanded="true"
                                    onFocus={this.toggleMenu}
                                    onBlur={this.toggleMenu}>
                                    <span className="sr-only">Comment options</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                    </svg>
                                </button>
                            </div>
                            <Transition
                                show={isMenuOpen}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-out duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1" role="menu" aria-orientation="vertical"
                                         aria-labelledby="options-menu">
                                        <button
                                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem">
                                            Favourite
                                        </button>
                                        <button
                                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem">
                                            Share
                                        </button>
                                        {hasPermission &&
                                        <button
                                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem">
                                            Delete
                                        </button>
                                        }
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                    <p className="text-gray-500 prose-sm">{comment.body}</p>
                    <div className="mt-4">
                        <span
                            className="text-sm font-medium text-indigo-600">
                                    <DayJS format="MMM d, YYYY">{comment.created_at}</DayJS>
                            </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentItem;