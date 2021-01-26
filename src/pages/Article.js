import React from 'react';
import DayJS from 'react-dayjs';

import CommentList from 'components/CommentList';

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
        const {user} = this.props;
        const isLoggedIn = user !== null;

        return (
            <div className="relative py-16 bg-white overflow-hidden">
                {isLoggedIn &&
                <div className="-mt-4 mb-8 md:absolute md:top-0 md:right-0 md:p-10 md:my-auto">
                    <div className="flex justify-center">
                            <span className="relative z-0 inline-flex shadow-sm rounded-md -space-x-px">
                              <button type="button"
                                      className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                <span className="sr-only">Edit</span>
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true">
                                  <path
                                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                </svg>
                              </button>
                              <button type="button"
                                      className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                <span className="sr-only">Delete</span>
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true">
                                  <path fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"/>
                                </svg>
                              </button>
                            </span>
                    </div>
                </div>
                }
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
                    <CommentList
                        comments={articleComments}/>
                    }
                </div>
                }
            </div>
        )
    }
}

export default Article;