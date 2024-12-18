import { notification } from "antd";
import Input from "antd/es/input/Input";
import { useState } from "react";
import ApiInstance from "../config/Apis/ApiInstance";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [model, setModel] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        if (!model.email || !model.password) {
            return notification.error({
                message: "Validation error",
                description: "Email and Password are required",
            });
        }

        try {
            setLoader(true);
            await ApiInstance.post("/Login", model)
                .then((res) => {
                    console.log(res, "send");
                    notification.success({
                        message: "Congrats",
                        description: "User Successfully Logged In",
                    });
                    setLoader(false);
                    navigate("/Todo");
                })
                .catch((err) => {
                    console.log(err);
                    notification.error({
                        message: "Authentication Error",
                        description: "Please provide a valid email and password",
                    });
                    setLoader(false);
                });
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    };

    return (
        <>
            {/* Loader */}
            {loader && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <img
                        src="https://media.tenor.com/zecVkmevzcIAAAAM/please-wait.gif"
                        className="w-32 h-32 object-contain"
                        alt="Loading..."
                    />
                </div>
            )}

            {/* Login Form */}
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
                <div className="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300">
                    <h2 className="text-3xl font-bold text-center text-white">Login</h2>

                    {/* Email Input */}
                    <div>
                        <Input
                            className="w-full px-4 py-2 mt-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            onChange={(e) => setModel({ ...model, email: e.target.value })}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <Input.Password
                            className="w-full px-4 py-2 mt-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            onChange={(e) => setModel({ ...model, password: e.target.value })}
                        />
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            onClick={login}
                        >
                            Login
                        </button>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center">
                        <span className="text-gray-400 text-sm">
                            Need an account?
                            <Link to={'/'} className="text-blue-400 hover:underline">
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
