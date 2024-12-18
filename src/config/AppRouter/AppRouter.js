import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../../auth/SignUp";
import Login from "../../auth/Login";
import Todo from "../../Todo/Todo";

export default function AppRouter() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignUp />} />
                        <Route path="Login" element={<Login />} />
                        <Route path="Todo" element={<Todo />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}