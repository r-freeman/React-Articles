import React from 'react';
import CommentItem from './CommentItem';

class CommentList extends React.Component {
    render() {
        const {comments} = this.props;
        const hasComments = (comments !== null && comments.length > 0);

        return (
            <div className="max-w-prose mx-auto my-16">
                <h3 className="text-xl leading-8 font-extrabold tracking-tight text-gray-900">
                    Comments
                </h3>
                {hasComments &&
                <div>
                    {comments.map(comment => {
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