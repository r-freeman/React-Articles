import React from 'react';
import ArticleList from 'components/ArticleList';

class Home extends React.Component {
    render() {
        return (
            <div className="bg-white pt-16 pb-20 px-8">
                <div className="relative max-w-full mx-auto">
                    <div>
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                            Latest
                        </h2>
                        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet.
                            Sapien
                            tortor lacus arcu.
                        </p>
                    </div>
                    <ArticleList
                        articles={this.props.articles}
                        categories={this.props.categories}/>
                </div>
            </div>
        )
    }
}

export default Home;