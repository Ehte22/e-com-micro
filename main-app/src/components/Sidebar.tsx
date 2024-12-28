import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "auth/redux/auth.api"
import { toast } from "../services/toast";
import { useSelector } from "react-redux";
import { LOAD_CART_API, RootState } from "../redux/store";
import Loader from "./Loader";

interface ISidebarProps {
    isSidebarOpen: boolean,
    toggleSidebar: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const [signOut, { data: message, isSuccess, isLoading }] = useSignOutMutation()
    const { user } = useSelector<RootState, any>(state => state.auth)

    const navigate = useNavigate()

    const handleSignOut = () => {
        if (user) {
            signOut()
            navigate("/product")
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.showSuccess(message)
        }
    }, [message, isSuccess])

    useEffect(() => {
        LOAD_CART_API()
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div
            className={`fixed top-0 left-0 w-64 h-full bg-gray-100 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="p-4">
                <h2 className="text-xl text-black font-bold">Menu</h2>
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-black text-2xl focus:outline-none"
                >
                    <FiX />
                </button>
            </div>
            <nav className="mt-8 space-y-4">
                <Link
                    to="/"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Home
                </Link>
                <Link
                    to="/product/products"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Products
                </Link>
                <Link
                    to="/cart"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Cart
                </Link>
                <Link
                    to="/order"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Orders
                </Link>

            </nav>
            {/* Logout Button */}
            <div className="absolute bottom-4 w-full px-4">
                {
                    user
                        ? <button
                            onClick={handleSignOut}
                            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
                        >
                            Sign Out
                        </button>
                        : <button
                            onClick={() => navigate("/auth")}
                            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
                        >
                            Sign In
                        </button>
                }
            </div>
        </div>
    );
};

export default Sidebar;
