import React from 'react';

class EditArticleModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            body: null,
            categoryId: null,
            titleError: '',
            bodyError: '',
            isEditingArticle: false
        }

        this.editArticleModal = React.createRef();

        this.handleEscape = this.handleEscape.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEditArticleSubmit = this.onEditArticleSubmit.bind(this);
    }

    componentDidMount() {
        this.editArticleModal.current.addEventListener('keydown', this.handleEscape);
    }

    componentWillUnmount() {
        this.editArticleModal.current.removeEventListener('keydown', this.handleEscape);
    }

    // need this code because article prop equals null on first render
    componentDidUpdate(prevProps) {
        if (prevProps.article !== this.props.article) {
            const {title, body, category_id} = this.props.article;

            this.setState({
                title,
                body,
                categoryId: category_id
            })
        }
    }

    handleEscape(e) {
        const {isVisible, toggleEditArticleModal} = this.props;

        if (isVisible && (e.key === 'Esc' || e.key === 'Escape')) {
            toggleEditArticleModal();
        }
    }

    validateTitle() {
        const titleField = this.title;
        let error = '';

        if (!titleField.validity.valid) {
            if (titleField.validity.valueMissing) {
                error = 'Title is required.';
            } else if (titleField.validity.tooShort) {
                error = 'Title is too short, minimum length is 8 characters.'
            } else if (titleField.validity.tooLong) {
                error = 'Title is too long, maximum length is 48 characters.';
            }
        }

        titleField.setCustomValidity(error);

        this.setState({
            title: titleField.value,
            titleError: error
        })
    }

    validateBody() {
        const bodyField = this.body;
        let error = '';

        if (!bodyField.validity.valid) {
            if (bodyField.validity.valueMissing) {
                error = 'Body is required.';
            } else if (bodyField.validity.tooShort) {
                error = 'Body is too short, minimum length is 8 characters.';
            } else if (bodyField.validity.tooLong) {
                error = 'Body is too long, maximum length is 256 characters.';
            }
        }

        bodyField.setCustomValidity(error);

        this.setState({
            body: bodyField.value,
            bodyError: error
        })
    }

    handleInputChange(event) {
        const {target} = event;
        const {name, value} = target;

        if (name === 'title') {
            this.validateTitle();
        } else if (name === 'body') {
            this.validateBody();
        } else if (name === 'category') {
            this.setState({
                categoryId: parseInt(value)
            })
        }
    }

    async onEditArticleSubmit(event) {
        event.preventDefault();

        const {title, body, categoryId} = this.state;
        const {toggleEditArticleModal} = this.props;

        this.validateTitle();
        this.validateBody();

        if (this.editArticleForm.checkValidity()) {
            this.setState({
                isEditingArticle: true
            })

            try {
                let editArticleStatue = await this.props.editArticle(title, body, categoryId);

                if (editArticleStatue === true) {
                    toggleEditArticleModal();
                    this.setState({
                        isEditingArticle: false
                    })
                }
            } catch (e) {
                this.setState({
                    isEditingArticle: false
                });
                console.log(e);
            }
        }
    }

    render() {
        const {title, body, categoryId, titleError, bodyError, isEditingArticle} = this.state;
        const {isVisible, categories} = this.props;
        const {toggleEditArticleModal} = this.props;
        const validStyle = "border-green-300 focus:ring-green-500 focus:border-green-500";
        const invalidStyle = "border-red-300 focus:ring-red-500 focus:border-red-500";
        const normalStyle = "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

        return (
            <div ref={this.editArticleModal}>
                {isVisible &&
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                    >
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true"
                             onClick={toggleEditArticleModal}>
                            <div className="absolute inset-0 bg-gray-700 bg-opacity-50"/>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-6 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div>
                                <div
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg tracking-tight font-extrabold text-gray-900"
                                        id="modal-headline">
                                        Edit Article
                                    </h3>
                                    <form className="mt-6 text-left space-y-6" ref={ref => this.editArticleForm = ref}
                                          onSubmit={this.onEditArticleSubmit}
                                          noValidate={true}>
                                        <div>
                                            <label htmlFor="title"
                                                   className="sr-only">title</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <input type="text" name="title" id="title"
                                                       defaultValue={title}
                                                       className={`${(title !== null && titleError === ''
                                                           ? validStyle : titleError !== ''
                                                               ? invalidStyle : normalStyle)} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-sm`}
                                                       placeholder="Title"
                                                       aria-invalid="true" aria-describedby="title-error"
                                                       minLength="8"
                                                       maxLength="48"
                                                       required
                                                       ref={ref => this.title = ref}
                                                       onChange={this.handleInputChange}
                                                       autoFocus={true}/>
                                                <div
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    {(title !== null && titleError !== '') &&
                                                    <svg className="h-5 w-5 text-red-500"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    }
                                                    {(title !== null && titleError === '') &&
                                                    <svg className="h-5 w-5 text-green-500" fill="none"
                                                         stroke="currentColor"
                                                         viewBox="0 0 24 24"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                    }
                                                </div>
                                            </div>
                                            {(title !== null && titleError !== '') &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="title-error">{titleError}</p>
                                            }
                                        </div>
                                        <div>
                                            <label htmlFor="category"
                                                   className="sr-only">Category</label>
                                            <select id="category" name="category"
                                                    defaultValue={categoryId}
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 text-gray-400 focus:text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md shadow-sm"
                                                    ref={ref => this.category = ref}
                                                    onChange={this.handleInputChange}>
                                                {categories.map((category) => {
                                                    return (
                                                        <option key={category.id}
                                                                value={category.id}>{category.title}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="body" className="sr-only">
                                                Body
                                            </label>
                                            <div className="mt-1">
                                                    <textarea id="body" name="body" rows="3"
                                                              className={`${(body !== null && bodyError === ''
                                                                  ? validStyle : bodyError !== ''
                                                                      ? invalidStyle : normalStyle)} block w-full border rounded-md shadow-sm placeholder-gray-400 text-sm`}
                                                              placeholder="Write about something."
                                                              minLength="8"
                                                              maxLength="256"
                                                              required
                                                              defaultValue={body}
                                                              ref={ref => this.body = ref}
                                                              onChange={this.handleInputChange}/>
                                            </div>
                                            {(body !== null && bodyError !== '') &&
                                            <p className="mt-2 text-sm text-red-600"
                                               id="body-error">{bodyError}</p>
                                            }
                                        </div>
                                        <div
                                            className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                            <button type="button"
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 text-sm"
                                                    onClick={this.onEditArticleSubmit}>
                                                {isEditingArticle &&
                                                <svg className="animate-spin inline-flex h-5 w-5 text-white"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                </svg>
                                                }
                                                {!isEditingArticle &&
                                                <span className="h-5">Update</span>
                                                }
                                            </button>
                                            <button type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 text-sm"
                                                    onClick={toggleEditArticleModal}>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
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

export default EditArticleModal;