import React, {Component} from 'react';
import ArticleItem from './ArticleItem';
import ArticleSkeleton from './ArticleSkeleton';

class ArticleList extends Component {
    render() {
        const hasArticles = this.props.articles.length > 0

        return (
            <div className="mt-12 pt-8 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
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
                [...Array(5)].map(() => {
                    return (
                        <ArticleSkeleton/>
                    )
                })
                }
            </div>
        )
    }
}

ArticleList.defaultProps = {
    limit: -1
}

export default ArticleList;