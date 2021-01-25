import React from 'react';
import {withRouter} from 'react-router-dom';

class Register extends React.Component {
    DEFAULTS = {
        name: null,
        email: null,
        password: null,
        confirm: null,
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmError: '',
        isRegistering: false,
        registrationError: ''
    }

    constructor(props) {
        super(props);
        this.state = this.DEFAULTS;
        this.validateName = this.validateName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateConfirm = this.validateConfirm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
        this.resetRegisterForm = this.resetRegisterForm.bind(this);
    }

    validateName() {
        const nameField = this.name;
        let error = '';

        if (!nameField.validity.valid) {
            if (nameField.validity.valueMissing) {
                error = 'Name is required.';
            } else if (nameField.validity.tooShort) {
                error = 'Name must be at least 6 characters long.';
            } else if (nameField.validity.tooLong) {
                error = 'Name length must be less than 64 characters.';
            }
        }

        nameField.setCustomValidity(error);

        this.setState({
            name: nameField.value,
            nameError: error
        })
    }

    validateEmail() {
        const emailField = this.email;
        let error = '';

        if (!emailField.validity.valid) {
            if (emailField.validity.valueMissing) {
                error = 'Email address is required.';
            } else if (emailField.validity.typeMismatch) {
                error = 'You must enter a valid email address.';
            }
        }

        emailField.setCustomValidity(error);

        this.setState({
            email: emailField.value,
            emailError: error
        })
    }

    validatePassword() {
        const passwordField = this.password;
        let error = '';

        if (!passwordField.validity.valid) {
            if (passwordField.validity.valueMissing) {
                error = 'Password is required.'
            } else if (passwordField.validity.tooShort) {
                error = 'Password must be at least 6 characters long.';
            } else if (passwordField.validity.tooLong) {
                error = 'Password length must be less than 64 characters.';
            }
        }

        passwordField.setCustomValidity(error);

        this.setState({
            password: passwordField.value,
            passwordError: error
        })
    }

    validateConfirm() {
        const passwordField = this.password;
        const confirmField = this.confirm;
        let error = '';

        if (passwordField.value !== confirmField.value) {
            error = 'Passwords do not match.'
        } else if (!confirmField.validity.valid) {
            if (confirmField.validity.valueMissing) {
                error = 'Password is required.'
            } else if (confirmField.validity.tooShort) {
                error = 'Password must be at least 6 characters long.';
            } else if (confirmField.validity.tooLong) {
                error = 'Password length must be less than 64 characters.';
            }
        }

        confirmField.setCustomValidity(error);

        this.setState({
            confirm: confirmField.value,
            confirmError: error
        })
    }

    handleInputChange(event) {
        const {target} = event;
        const name = target.name;
        const type = target.type;

        if (type === 'text' && name === 'name') {
            this.validateName();
        } else if (target.type === 'email') {
            this.validateEmail();
        } else if (target.type === 'password' && name === 'password') {
            this.validatePassword();
        } else if (target.type === 'password' && name === 'confirm') {
            this.validateConfirm();
        }
    }

    async onRegisterSubmit(event) {
        event.preventDefault();
        const {name, email, password} = this.state;

        this.validateName()
        this.validateEmail();
        this.validatePassword();
        this.validateConfirm();

        // check if register form has passed our validation checks
        if (event.target.checkValidity()) {
            this.setState({
                isRegistering: true
            })

            try {
                let registerStatus = await this.props.register(name, email, password)

                if (registerStatus === true) {
                    // reset the register form
                    this.resetRegisterForm();
                    // send back to home on successful registration
                    this.props.history.push('/');
                }
            } catch (e) {
                this.setState({
                    isRegistering: false
                })
                console.log(e);
            }
        }
    }

    // reset register form and state
    resetRegisterForm() {
        this.setState(this.DEFAULTS);
        this.registerForm.reset();
    }

    render() {
        const {
            name, email, password, confirm,
            nameError, emailError, passwordError, confirmError, isRegistering
        } = this.state;
        const validStyle = "border-green-300 focus:ring-green-500 focus:border-green-500";
        const invalidStyle = "border-red-300 focus:ring-red-500 focus:border-red-500";
        const normalStyle = "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

        return (
            <div className="min-h-screen flex flex-col justify-center -mt-16 px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create an account
                    </h2>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 sm:px-10">
                        <form ref={ref => this.registerForm = ref} className="space-y-6"
                              onSubmit={this.onRegisterSubmit}
                              noValidate={true}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    <span className="sr-only">Name</span>
                                </label>
                                <div className="mt-1 relative">
                                    <input id="name" name="name" type="text" required minLength="6" maxLength="64"
                                           placeholder="Name"
                                           ref={ref => this.name = ref}
                                           onChange={this.handleInputChange}
                                           className={`${(name !== null && nameError === ''
                                               ? validStyle : nameError !== ''
                                                   ? invalidStyle : normalStyle)} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}/>
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {(name !== null && nameError !== '') &&
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        }
                                        {(name !== null && nameError === '') &&
                                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        }
                                    </div>
                                </div>
                                {(name !== null && nameError !== '') &&
                                <p className="mt-2 text-sm text-red-600" id="name-error">{nameError}</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    <span className="sr-only">Email</span>
                                </label>
                                <div className="mt-1 relative">
                                    <input id="email" name="email" type="email" autoComplete="email" required
                                           placeholder="Email"
                                           ref={ref => this.email = ref}
                                           onChange={this.handleInputChange}
                                           className={`${(email !== null && emailError === ''
                                               ? validStyle : emailError !== ''
                                                   ? invalidStyle : normalStyle)} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}/>
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {(email !== null && emailError !== '') &&
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        }
                                        {(email !== null && emailError === '') &&
                                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        }
                                    </div>
                                </div>
                                {(email !== null && emailError !== '') &&
                                <p className="mt-2 text-sm text-red-600" id="email-error">{emailError}</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    <span className="sr-only">Password</span>
                                </label>
                                <div className="mt-1 relative">
                                    <input id="password" name="password" type="password" minLength="6" maxLength="64"
                                           required
                                           placeholder="Password"
                                           className={`${(password !== null && passwordError === '' ? validStyle : passwordError !== '' ? invalidStyle : normalStyle)} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
                                           onChange={this.handleInputChange}
                                           ref={ref => this.password = ref}/>
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {(password !== null && passwordError !== '') &&
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        }
                                        {(password !== null && passwordError === '') &&
                                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        }
                                    </div>
                                </div>
                                {(password !== null && passwordError !== '') &&
                                <p className="mt-2 text-sm text-red-600" id="password-error">{passwordError}</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                                    <span className="sr-only">Confirm password</span>
                                </label>
                                <div className="mt-1 relative">
                                    <input id="confirm" name="confirm" type="password" minLength="6" maxLength="64"
                                           required
                                           placeholder="Confirm password"
                                           className={`${(confirm !== null && confirmError === '' ? validStyle : confirmError !== '' ? invalidStyle : normalStyle)} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
                                           onChange={this.handleInputChange}
                                           ref={ref => this.confirm = ref}/>
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        {(confirm !== null && confirmError !== '') &&
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        }
                                        {(confirm !== null && confirmError === '') &&
                                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        }
                                    </div>
                                </div>
                                {(confirm !== null && confirmError !== '') &&
                                <p className="mt-2 text-sm text-red-600" id="confirm-error">{confirmError}</p>
                                }
                            </div>
                            <div className="mt-8">
                                <button type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {isRegistering &&
                                    <svg className="animate-spin inline-flex h-5 w-5 text-white"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                                stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    }
                                    {!isRegistering &&
                                    <span className="h-5">Register</span>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Register);