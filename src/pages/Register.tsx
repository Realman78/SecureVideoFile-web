import React, { FC, useState } from 'react';
import CenterWrapper from '../components/UI/CenterWrapper';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuthActions } from '../store/actions/authActions';
import { ConnectedProps, connect } from 'react-redux';

interface RegisterFormState {
    mail: string;
    username: string;
    password: string;
}

const Register: FC<PropsFromRedux> = ({ register }) => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<RegisterFormState>({
        mail: "",
        username: "",
        password: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("User Info:", formData);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
            return toast.error("Invalid mail.")
        }
        if (formData.username.length < 2) {
            return toast.error("Username should contain at least 2 characters.")
        }
        if (formData.password.length < 8) {
            return toast.error("Password should contain at least 8 characters.")
        }
        try {
            const response = await register(formData, navigate)
            console.log("response", response)
            if (response.error) {
                if (response?.error?.response?.data?.message)
                    return toast.error(response?.error.response?.data?.message)
                else
                    return toast.error("Something went wrong.")
            }
        } catch (error) {
            console.error("Error occurred during register:", error);
        }
    }

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
                                    className="bg-white appearance-none text-[#041B37] rounded w-full py-2 px-3 leading-tight focus:outline-none"
                                    id="mail"
                                    type="email"
                                    name="mail"
                                    placeholder="Enter your e-mail"
                                    value={formData.mail}
                                    onChange={handleInputChange}
                                    required
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
                                    name="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
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
                                    name="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleSubmit}
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

const mapActionsToProps = (dispatch: any) => {
    return {
        ...getAuthActions(dispatch)
    }
}
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Register);
