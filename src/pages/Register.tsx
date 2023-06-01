import React from 'react';
import CenterWrapper from '../components/UI/CenterWrapper';
import Header from '../components/Header';

const Register = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <Header renderRight={false} />
        <CenterWrapper>
            <div className="flex items-center justify-center h-full w-full">
                <form className="bg-[#041B37] shadow-md px-32 pt-8 pb-8 mb-4 rounded-xl w-3/5">
                    <h2 className="text-4xl text-center font-bold">Register</h2>
                    <div className="mt-8">
                        <div className="mb-4">
                            <label
                                className="block text-sm font-bold mb-2"
                                htmlFor="mail"
                            >
                                E-mail
                            </label>
                            <input
                                className=" bg-white appearance-none text-[#041B37] rounded w-full py-2 px-3 leading-tight focus:outline-none"
                                id="mail"
                                type="email"
                                placeholder="Enter your e-mail"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                className=" bg-white appearance-none text-[#041B37] rounded w-full py-2 px-3 leading-tight focus:outline-none"
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className=" bg-white appearance-none text-[#041B37] rounded w-full py-2 px-3 leading-tight focus:outline-none"
                                id="password"
                                type="password"
                                placeholder="********"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Register
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </CenterWrapper>
        </div>
    );
};

export default Register;
