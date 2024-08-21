import React, { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import InputBox from '../input.component';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    let token = useParams().token;
    let navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passMathError, setPassMathError] = useState('')
    const { resetPassword, user, error, set } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPassMathError('Passwords do not match')
            return;
        }
        await resetPassword(password, token)
        if (!error) {
            navigate('/signin');
        }
        setPassword('')
        setConfirmPassword('')
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset Your Password
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    New Password
                                </label>
                                <InputBox
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm Password
                                </label>
                                <InputBox
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                />
                            </div>
                            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                            {passMathError && <p className="text-red-500 font-semibold mt-2">{passMathError}</p>}
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-transform duration-300 ease-in-out transform hover:scale-10 shadow-md hover:shadow-lg"
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
