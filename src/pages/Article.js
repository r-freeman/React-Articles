import React from 'react';
import DayJS from 'react-dayjs';
import {withRouter} from 'react-router-dom';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            article: null,
            articleComments: null
        }
    }

    componentDidMount() {
        const articleId = this.props.match.params.id ? parseInt(this.props.match.params.id) : null;
        const articles = this.props.articles.length > 0 ? this.props.articles : null;
        let article, comments = [];

        if (articles !== null) {
            // locate the article with matching id in the articles prop
            article = articles.find(article => article.id === articleId);
            if (article !== null) {
                // loop through the comments prop and look for matching article id
                this.props.comments.forEach(comment => {
                    if (comment.article_id === article.id) {
                        // found comment, append it to the comments array
                        comments.push(comment);
                    }
                })
                // no comments found
                if (!comments.length > 0) {
                    comments = null;
                }
                this.setState({
                    article: article,
                    articleComments: comments
                })
            }
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        const {article, articleComments} = this.state;

        return (
            <div className="relative py-16 bg-white overflow-hidden">
                {article !== null &&
                <div className="relative px-8">
                    <div className="text-lg max-w-prose mx-auto">
                        <h1>
                            <span
                                className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">{article.category.title}</span>
                            <span
                                className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{article.title}</span>
                        </h1>
                        <div className="flex flex-col items-center mt-6 text-center">
                            <img className="mx-auto h-16 w-16 rounded-full"
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt=""/>
                            <div className="mt-1">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{article.user.name}</h3>
                                    <p className="text-sm text-gray-900">
                                        <DayJS format="MMM D, YYYY">
                                            {article.created_at}
                                        </DayJS>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-8 text-xl text-gray-500 leading-8">Aliquet nec orci mattis amet quisque
                            ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at
                            vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas
                            fringilla sapien.</p>
                    </div>
                    <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                        <p>{article.body}</p>
                    </div>
                    {articleComments !== null &&
                    <div className="max-w-prose mx-auto my-16">
                        <h3 className="text-xl leading-8 font-extrabold tracking-tight text-gray-900">
                            Comments
                        </h3>
                        <div>
                            {articleComments.map(comment => {
                                return (
                                    <div className="flex mt-8" key={comment.id}>
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
                            })}
                        </div>
                    </div>
                    }
                </div>
                }
            </div>
        )
    }
}

export default withRouter(Article);