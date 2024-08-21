import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'
import InputBox from '../input.component'
import { useNavigate } from 'react-router-dom'

const EmailChecking = () => {
    const navigate = useNavigate()
    const { forgotPassword, isLoading, error } = useAuthStore();
    const [formValue, setFormValue] = useState({});

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formValue)
        await forgotPassword(formValue.email);
        navigate('/password-link-sent')
        setFormValue({})
    }
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
                            {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">

                            </h1> */}
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6"    >
                                <InputBox
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                />

                                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-transform duration-300 ease-in-out transform  hover:scale-10 shadow-md hover:shadow-lg"
                                >
                                    {isLoading ? (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"></path>
                                            </svg>
                                        </span>
                                    ) :
                                        "Send"
                                    }
                                </button>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EmailChecking
