import React, {Component} from 'react';

class ArticleFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilterOpen: false
        }

        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
    }

    handleEscape(e) {
        if (this.state.isFilterOpen && (e.key === 'Esc' || e.key === 'Escape')) {
            this.setState({
                isFilterOpen: false
            })
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleEscape)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscape)
    }

    toggleFilter() {
        this.setState(prevState => ({
            isFilterOpen: !prevState.isFilterOpen
        }), () => {
            // disable scrolling on body while filter panel is open
            if (this.state.isFilterOpen) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    }

    render() {
        const filterOpen = this.state.isFilterOpen;
        const sortOrder = this.props.sortOrder;

        return (
            <div>
                <div className={`${filterOpen ? 'inset-0' : ''} fixed overflow-hidden z-10`}>
                    <div className={`${filterOpen ? 'inset-0' : ''} absolute overflow-hidden`}>
                        <div className="absolute inset-0 bg-gray-700 bg-opacity-50"
                             aria-hidden="true"
                             onClick={this.toggleFilter}/>
                        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
                                 aria-labelledby="slide-over-heading">
                            <div className="relative w-screen max-w-md">
                                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-auto">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900">
                                                Filter articles
                                            </h2>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={this.toggleFilter}>
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <form name="articleFilter">
                                                <div className="space-y-8">
                                                    <div>
                                                        <label className="block font-medium text-gray-700">
                                                            Category
                                                        </label>
                                                        <ul className="mt-2 relative bg-white rounded-md -space-y-px">
                                                            {this.props.categories.map((category, i) => {
                                                                return (
                                                                    <li key={category.id}>
                                                                        <div
                                                                            className={`${i === 0 ? 'rounded-tl-md rounded-tr-md'
                                                                                : i === this.props.categories.length - 1 ? 'rounded-bl-md rounded-br-md' : ''} 
                                                                                ${category.id === this.props.filteredCategory ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200'} relative border p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3`}>
                                                                            <label
                                                                                className="flex items-center text-sm cursor-pointer">
                                                                                <input name="categories"
                                                                                       type="radio"
                                                                                       className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
                                                                                       checked={(category.id === this.props.filteredCategory)}
                                                                                       value={category.id}
                                                                                       onChange={this.props.onCategoryChange}/>
                                                                                <span
                                                                                    className="ml-3 font-medium text-gray-900">{category.title}</span>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium text-gray-700">
                                                            Author
                                                        </label>
                                                        <div className="mt-2">
                                                            <input type="text" name="author" id="author"
                                                                   className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                                                                   onChange={this.props.onAuthorChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium text-gray-700">
                                                            Articles per page
                                                        </label>
                                                        <div className="mt-2">
                                                            <input type="text" name="articles_per_page"
                                                                   id="articles_per_page"
                                                                   className="focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                                                                   data-value="-1"
                                                                   onChange={this.props.onArticlesPerPageChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                                            onClick={this.props.onResetFilter}>
                                                            <svg className="-ml-0.5 mr-2 w-5 h-5" fill="none"
                                                                 stroke="currentColor"
                                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                            </svg>
                                                            Reset filter
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="flex justify-start space-x-4">
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                        onClick={this.toggleFilter}>
                        <svg className="-ml-0.5 sm:mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                        </svg>
                        <span className="hidden sm:block">
                            Filter articles
                        </span>
                    </button>
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                        onClick={this.props.onSortOrderChange}>
                        {sortOrder === 'asc' &&
                        <svg className="-ml-0.5 mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 15l7-7 7 7"/>
                        </svg>
                        }
                        {(sortOrder === 'desc' || sortOrder === null) &&
                        <svg className="-ml-0.5 mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M19 9l-7 7-7-7"/>
                        </svg>
                        }
                        Sort by category
                    </button>
                </div>
            </div>
        )
    }
}

export default ArticleFilter;