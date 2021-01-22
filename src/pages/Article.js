import React from 'react';
import DayJS from 'react-dayjs';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            article: null
        }
    }

    componentDidMount() {
        const articleId = parseInt(this.props.match.params.id);
        const articles = this.props.articles;
        const article = articles.find(article => article.id === articleId);

        this.setState({
            article
        })
    }

    render() {
        const article = this.state.article;

        return (
            <div className="relative py-16 bg-white overflow-hidden">
                {article !== null &&
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <div className="text-lg max-w-prose mx-auto">
                        <h1>
                            <span
                                className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">{article.category.title}</span>
                            <span
                                className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{article.title}</span>
                        </h1>
                        <div className="flex flex-col items-center mt-6 text-center">
                            <img className="mx-auto h-12 w-12 rounded-full"
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
                </div>
                }
            </div>
        )
    }
}

export default Article;