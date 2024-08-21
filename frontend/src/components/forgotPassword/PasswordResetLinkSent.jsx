import React from 'react'
import { Link } from 'react-router-dom'

const PasswordResetLinkSent = () => {
    return (
        <div>
            <div>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                        <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Flowbite
                        </Link>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Password Reset Link Sent
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We have sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    If you don’t receive the email, please check your spam folder or request a new link.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default PasswordResetLinkSent

