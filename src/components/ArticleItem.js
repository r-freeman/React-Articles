import React, {Component} from 'react';
import DayJS from 'react-dayjs';
import {NavLink} from "react-router-dom";

class ArticleItem extends Component {
    render() {
        const {article} = this.props;

        return (
            <div>
                <div
                    className="inline-block">
                        <span
                            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {article.category.title}
                        </span>
                </div>
                <NavLink
                    exact
                    to={`/articles/${article.id}`}
                    className="block mt-4">
                    <p className="text-xl font-semibold text-gray-900">
                        {article.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                        {article.body}
                    </p>
                </NavLink>
                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <span className="sr-only">{article.user.name}</span>
                        <img className="h-10 w-10 rounded-full"
                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                             alt=""/>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {article.user.name}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <DayJS format="MMM D, YYYY">
                                {article.created_at}
                            </DayJS>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleItem;