import React from 'react';
import CommentItem from './CommentItem';
import _ from 'lodash';

class CommentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortOrder: 'desc'
        }

        this.toggleSortOrder = this.toggleSortOrder.bind(this);
    }

    toggleSortOrder() {
        const {sortOrder} = this.state;
        let newSortOrder;

        if (sortOrder === 'desc') {
            newSortOrder = 'asc';
        } else if (sortOrder === 'asc') {
            newSortOrder = 'desc';
        }

        this.setState({
            sortOrder: newSortOrder
        })
    }

    render() {
        const {comments} = this.props;
        const {sortOrder} = this.state;
        const hasComments = (comments !== null && comments.length > 0);
        const sortedComments = _.orderBy(comments, ['id'], sortOrder);

        return (
            <div className="max-w-prose mx-auto my-16">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl leading-8 font-extrabold tracking-tight text-gray-900">
                        Comments
                    </h3>
                    <button
                        className="inline-flex items-center py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-offset-gray-800"
                        onClick={this.toggleSortOrder}>
                        {sortOrder === 'desc' &&
                        <svg className="-ml-0.5 mr-2 w-5 h-5" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M19 9l-7 7-7-7"/>
                        </svg>
                        }
                        {sortOrder === 'asc' &&
                        <svg className="-ml-0.5 mr-2 w-5 h-5" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M19 9l-7 7-7-7"/>
                        </svg>
                        }
                        <span className="text-sm font-medium text-gray-900">
                            {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                        </span>
                    </button>
                </div>
                {hasComments &&
                <div>
                    {sortedComments.map(comment => {
                        return (
                            <CommentItem
                                comment={comment}
                                key={comment.id}/>
                        )
                    })}
                </div>
                }
            </div>
        )
    }
}

export default CommentList;