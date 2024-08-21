import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

const VarifyEmail = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState({ code: "" });
    const { verifyEmail, isAuthenticated, error, isLoading } = useAuthStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Restrict input to numeric values and maximum length of 6
        if (/^\d{0,6}$/.test(value)) {
            setOtp({ ...otp, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyEmail(otp.code);
            if (!error) {
                setOtp({ code: "" }); // Clear OTP field
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold  text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Verify Your Email
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <input
                                        onChange={handleChange}
                                        value={otp.code}
                                        type="number"
                                        name="code"
                                        id="otp"
                                        maxLength={6}
                                        className="bg-gray-50 text-center border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter OTP" required />
                                </div>
                                {error && <p className='text-red-500 font-semibold my-2'>{error}</p>}
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-transform duration-300 ease-in-out transform  hover:scale-10 shadow-md hover:shadow-lg">
                                    {isLoading ? (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"></path>
                                            </svg>
                                        </span>
                                    ) :
                                        "Varify"
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

export default VarifyEmail
