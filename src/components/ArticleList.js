import React, {Component} from 'react';
import ArticleItem from './ArticleItem';

class ArticleList extends Component {
    render() {
        return (
            <div className="mt-12 pt-8 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                {this.props.articles.slice(0, 5).map(article => {
                    return (
                        <ArticleItem article={article} key={article.id}/>
                    )
                })}
            </div>
        )
    }
}

export default ArticleList;