import React, {Component} from 'react';

import ArticleItem from './ArticleItem';
import ArticleSkeleton from './ArticleSkeleton';
import ArticleFilter from './ArticleFilter';

class ArticleList extends Component {
    render() {
        const hasArticles = this.props.articles.length > 0
        const array = [0, 1, 2, 3, 4]

        return (
            <div className="mt-12">
                <ArticleFilter
                    articles={this.props.articles}
                    categories={this.props.categories}
                />
                <div className="pt-8 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                    {hasArticles &&
                    this.props.articles.slice(0, this.props.limit).map(article => {
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

ArticleList.defaultProps = {
    limit: -1
}

export default ArticleList;