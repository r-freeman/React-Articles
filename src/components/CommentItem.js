import React from 'react';
import DayJS from 'react-dayjs';

class CommentItem extends React.Component {
    render() {
        const {comment} = this.props;

        return (
            <div className="flex mt-8">
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
                        <span
                            className="ml-2 text-sm font-medium text-indigo-600">
                                                        <DayJS format="MMM d, YYYY">{comment.created_at}</DayJS>
                                                    </span>
                    </div>
                    <p className="text-gray-500 prose-sm">{comment.body}</p>
                </div>
            </div>
        )
    }
}

export default CommentItem;