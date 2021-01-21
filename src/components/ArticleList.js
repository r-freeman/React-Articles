import React, {Component} from 'react';
import _ from 'lodash';

import ArticleItem from './ArticleItem';
import ArticleSkeleton from './ArticleSkeleton';
import ArticleFilter from './ArticleFilter';

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredCategory: null,
            filteredAuthor: null,
            sortOrder: null,
            articlesPerPage: -1
        }

        this.onCategoryChange = this.onCategoryChange.bind(this);
        // this.onAuthorChange = this.onAuthorChange.bind(this);
    }

    // a normal function must be bound in the constructor to access the
    // correct context of 'this'
    onCategoryChange(event) {
        // input value is a string, we need to set is as an integer with parseInt
        const category = parseInt(event.target.value);

        this.setState({
            filteredCategory: category
        })
    }

    // notice how arrow function can access the correct 'this' context
    // and this method doesn't require binding in the constructor
    onAuthorChange = (event) => {
        const author = event.target.value.toLowerCase();

        this.setState({
            filteredAuthor: author
        })
    }

    onArticlesPerPageChange = (event) => {
        let articlesPerPage = event.target.value;

        articlesPerPage = (articlesPerPage === "" || parseInt(articlesPerPage) === 0)
            ? parseInt(event.target.dataset.value) : parseInt(articlesPerPage);

        this.setState({
            articlesPerPage
        })
    }

    // Again, onSortChange has the correct 'this' context using an arrow function
    onSortOrderChange = () => {
        let sortOrder = this.state.sortOrder;

        if (sortOrder === null) {
            sortOrder = 'asc';
        } else if (sortOrder === 'asc') {
            sortOrder = 'desc';
        } else if (sortOrder === 'desc') {
            sortOrder = 'asc';
        }

        this.setState({
            sortOrder
        })
    }

    render() {
        const filteredCategory = this.state.filteredCategory;
        const filteredAuthor = this.state.filteredAuthor;
        const sortOrder = this.state.sortOrder;
        const articlesPerPage = this.state.articlesPerPage;

        let filteredArticles,
            sortedArticles,
            pagedArticles;

        // in this code we return each article that satisfies a true condition for the given expressions
        filteredArticles = this.props.articles
            .filter(
                article => (filteredCategory === null || article.category_id === filteredCategory)
                    && (filteredAuthor === null || article.user.name.toLowerCase().includes(filteredAuthor))
            );

        // we want to apply sorting and keep any filtering above
        sortedArticles = filteredArticles;
        if (sortOrder !== null) {
            sortedArticles = _.orderBy(filteredArticles, ['category.title'], sortOrder);
        }

        // after sorting and filtering we want to apply pagination to our articles
        pagedArticles = sortedArticles.slice(0, articlesPerPage);

        // evaluates to true if articles contains greater than zero items
        // this is used to conditionally render the articles or articles skeletons in the JSX below
        const hasArticles = pagedArticles.length > 0;

        // an array of five items, used to render five skeleton articles while fetching articles
        const array = [0, 1, 2, 3, 4]

        return (
            <div className="mt-12">
                <ArticleFilter
                    categories={this.props.categories}
                    articles={this.props.articles}
                    sortOrder={sortOrder}
                    onCategoryChange={this.onCategoryChange}
                    onAuthorChange={this.onAuthorChange}
                    onArticlesPerPageChange={this.onArticlesPerPageChange}
                    onSortOrderChange={this.onSortOrderChange}
                />
                <div className="pt-8 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    {hasArticles &&
                    pagedArticles.map(article => {
                        return (
                            <ArticleItem
                                article={article}
                                key={article.id}/>
                        )
                    })
                    }
                    {!hasArticles &&
                    // display 5 article skeletons while waiting for articles to load
                    array.map(value => {
                        return (
                            <ArticleSkeleton key={value}/>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default ArticleList;