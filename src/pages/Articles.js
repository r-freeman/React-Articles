import React from 'react';
import ArticleList from 'components/ArticleList';

function Articles(props) {
    return (
        <div className="bg-white pt-16 pb-20 px-8">
            <div className="relative max-w-full mx-auto">
                <div>
                    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                        Articles
                    </h2>
                    <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus impedit ipsam non sunt
                        tempora vitae?
                    </p>
                </div>
                <ArticleList
                    articles={props.articles}
                    categories={props.categories}
                />
            </div>
        </div>
    )
}

export default Articles;