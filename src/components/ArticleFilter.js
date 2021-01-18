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

        return (
            <div>
                <div className={`${filterOpen ? 'inset-0' : ''} fixed overflow-hidden z-10`}>
                    <div className={`${filterOpen ? 'inset-0' : ''} absolute overflow-hidden`}>
                        <div className="absolute inset-0 bg-gray-700 bg-opacity-25"
                             aria-hidden="true"
                             onClick={this.toggleFilter}/>
                        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
                                 aria-labelledby="slide-over-heading">
                            <div className="relative w-screen max-w-md">
                                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
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
                                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 sm:px-6">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <button
                    className="inline-flex items-center px-3 py-2 shadow-sm text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                    onClick={this.toggleFilter}>
                    <svg className="-ml-0.5 mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                    Filter articles
                </button>
            </div>
        )
    }
}

export default ArticleFilter;