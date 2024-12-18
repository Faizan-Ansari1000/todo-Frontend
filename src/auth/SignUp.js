import { Input, notification } from "antd";
import { useState } from "react";
import ApiInstance from "../config/Apis/ApiInstance";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
    const [model, setModel] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();

        if (!model.name || !model.email || !model.password) {
            return notification.error({
                message: "Validation Error",
                description: "All fields are required",
            });
        }

        try {
            setLoader(true);
            await ApiInstance.post("/signUp", model)
                .then((res) => {
                    console.log(res, "send");
                    notification.success({
                        message: "Congratulations!",
                        description: "User successfully signed up.",
                    });
                    setLoader(false);
                    navigate("/Todo");
                });
        } catch (err) {
            console.error(err);
            notification.error({
                message: "Error",
                description: "User could not be signed up. Try again!",
            });
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

            {/* SignUp Form */}
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
                <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-2xl">
                    <h2 className="text-3xl font-bold text-center text-white">
                        Create Your Account
                    </h2>

                    {/* Name Input */}
                    <div>
                        <Input
                            className="w-full px-4 py-2 mt-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="User name"
                            onChange={(e) => setModel({ ...model, name: e.target.value })}
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <Input
                            className="w-full px-4 py-2 mt-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setModel({ ...model, email: e.target.value })}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <Input.Password
                            className="w-full px-4 py-2 mt-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Password"
                            onChange={(e) => setModel({ ...model, password: e.target.value })}
                        />
                    </div>

                    {/* SignUp Button */}
                    <div>
                        <button
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={signUp}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Already Have an Account */}
                    <div className="text-center">
                        <span className="text-gray-400">Already have an account? </span>
                        <Link to={"/Login"} className="text-blue-400 hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
