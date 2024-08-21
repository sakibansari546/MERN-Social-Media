import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputBox from '../components/input.component';
import { useAuthStore } from '../store/auth.store';

const AuthForm = ({ type }) => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({});
    const { user, signupAndSignin, error, isLoading, isAuthenticated } = useAuthStore();

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupAndSignin(formValue, type);
            if (type === 'signup') {
                navigate('/verify-email');
            } else if (type === 'signin') {
                // Ensure the user is authenticated and verified before redirecting
                if (isAuthenticated && user?.personal_info?.isVerified) {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('An error occurred during submission:', error);
            // Handle specific errors, such as token expiration
            if (error.response?.status === 401) { // Assuming 401 for expired token
                navigate('/verify-email');
            }
        }
    };

    useEffect(() => {
        if (type === 'signup') {
            setFormValue({ username: '', email: '', password: '' });
        } else if (type === 'signin') {
            setFormValue({ email: '', password: '' });
        }
    }, [type]);

    useEffect(() => {
        // Check if user is authenticated and is verified, then redirect
        if (isAuthenticated && user?.personal_info?.isVerified) {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {type === 'signup' ? 'Create an account' : 'Signin to your account'}
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                {type === 'signup' && (
                                    <div>
                                        <InputBox value={formValue.username} onChange={handleChange} name='username' type='text' label="Username" placeholder='username' />
                                    </div>
                                )}
                                <div>
                                    <InputBox value={formValue.email} onChange={handleChange} name='email' type='email' label="Email" placeholder='exmp@gmail.com' />
                                </div>
                                <div>
                                    <InputBox value={formValue.password} onChange={handleChange} name='password' type='password' label="Password" placeholder='••••••••••••' />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm font-medium text-white hover:underline dark:text-primary-500">Forgot password?</Link>
                                </div>
                                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-transform duration-300 ease-in-out transform hover:scale-10 shadow-md hover:shadow-lg"
                                >
                                    {isLoading ? (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"></path>
                                            </svg>
                                        </span>
                                    ) : (
                                        type === 'signup' ? "Sign up" : "Sign in"
                                    )}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to={type === 'signup' ? '/signin' : "/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{type === 'signup' ? "signin" : "signup"}</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AuthForm;
