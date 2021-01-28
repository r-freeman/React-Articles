import React from 'react';
import {withRouter} from 'react-router-dom';

class DeleteArticleModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeletingArticle: false
        }

        this.deleteArticleModal = React.createRef();

        this.handleEscape = this.handleEscape.bind(this);
        this.onDeleteArticle = this.onDeleteArticle.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount() {
        this.deleteArticleModal.current.addEventListener('keydown', this.handleEscape);
    }

    componentWillUnmount() {
        this.deleteArticleModal.current.removeEventListener('keydown', this.handleEscape);
    }

    handleEscape(e) {
        const {isVisible} = this.props;

        if (isVisible && (e.key === 'Esc' || e.key === 'Escape')) {
            this.props.toggleDeleteArticleModal();
        }
    }

    async onDeleteArticle() {
        this.setState({
            isDeletingArticle: true
        });

        try {
            let deleteArticleStatus = await this.props.deleteArticle();

            if (deleteArticleStatus === true) {
                // toggle the modal and go home
                this.props.toggleDeleteArticleModal();
                this.goHome();
            }
        } catch (e) {
            console.log(e);
        }
    }

    goHome() {
        this.props.history.push('/');
        this.props.history.go();
    }

    render() {
        const {isVisible} = this.props;
        const {isDeletingArticle} = this.state;

        return (
            <div ref={this.deleteArticleModal}>
                {isVisible &&
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                    >
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true"
                             onClick={this.props.toggleDeleteArticleModal}>
                            <div className="absolute inset-0 bg-gray-700 bg-opacity-50"/>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-6 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div>
                                <div
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg tracking-tight font-extrabold text-gray-900"
                                        id="modal-headline">
                                        Delete Article
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this article? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="mt-6 space-y-6">
                                        <div
                                            className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                            <button type="button"
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 text-sm"
                                                    autoFocus={true}
                                                    onClick={this.onDeleteArticle}>
                                                {isDeletingArticle &&
                                                <svg className="animate-spin inline-flex h-5 w-5 text-white"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                </svg>
                                                }
                                                {!isDeletingArticle &&
                                                <span className="h-5">Submit</span>
                                                }
                                            </button>
                                            <button type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 text-sm"
                                                    onClick={this.props.toggleDeleteArticleModal}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(DeleteArticleModal);