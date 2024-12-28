import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiPower } from "react-icons/fi"; // Import necessary icons
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOAD_CART_API, RootState } from "../redux/store";
import { useSignOutMutation } from "auth/redux/auth.api"
import { toast } from "../services/toast";
import Loader from "./Loader";
import { useGetCartItemsQuery } from "cart/redux/cart.api";

const Navbar = () => {
    const { user } = useSelector<RootState, any>(state => state.auth)
    const [signOut, { data: message, isSuccess, isLoading }] = useSignOutMutation()
    const { data } = useGetCartItemsQuery()

    const navigate = useNavigate()

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSignOut = () => {
        if (user) {
            signOut()
            navigate("/product")
        }
    }

    useEffect(() => {
        LOAD_CART_API()
    }, [])


    useEffect(() => {
        if (isSuccess) {
            toast.showSuccess(message)
        }
    }, [message, isSuccess])

    if (isLoading) {
        return <Loader />
    }
    return <>
        {/* Navbar */}
        <nav className="bg-teal-700 md:px-12 lg:px-20">
            <div className="container p-4 mx-auto flex items-center justify-between">
                <div className="flex items-center gap-20">
                    {/* Logo */}
                    <div className="text-white text-xl font-bold">
                        <Link to="/product">E-Commerce</Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex space-x-4">
                        <Link to="/product" className="text-white hover:text-gray-200">
                            Home
                        </Link>
                        <Link to="/product/products" className="text-white hover:text-gray-200">
                            Products
                        </Link>
                        <Link to="/order" className="text-white hover:text-gray-200">
                            Orders
                        </Link>
                    </div>
                </div>

                {/* User Profile, Cart, and Search */}
                <div className="flex items-center space-x-6">
                    {/* Search Icon for Small Screens */}
                    <button
                        className="text-white text-2xl md:hidden focus:outline-none"
                        onClick={toggleSearch}
                        aria-label="Search"
                    >
                        <FiSearch />
                    </button>

                    {/* Search Bar for Medium+ Screens */}
                    <div className="relative hidden md:flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 px-4 py-2 rounded-sm focus:outline-none"
                        />
                        <FiSearch
                            className="absolute right-3 text-teal-600 text-xl cursor-pointer"
                            aria-label="Search"
                        />
                    </div>

                    {/* Cart Icon */}
                    <div className="relative">
                        <Link to="/cart" className="text-white hover:text-gray-200 text-2xl">
                            <FiShoppingCart />
                        </Link>
                        {data?.result?.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {data.result.length}
                            </span>
                        )}
                    </div>

                    {/* User Profile Icon */}
                    {user
                        ? <button
                            onClick={handleSignOut}
                            className="text-white hidden lg:block text-2xl focus:outline-none hover:text-gray-300"
                            aria-label="Logout"
                        >
                            <FiPower />
                        </button>
                        : <Link to="/auth" className="text-white hover:text-gray-200 text-2xl">
                            <FiUser />
                        </Link>
                    }

                    {/* Menu Button for Small Screens */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleSidebar}
                            className="text-white text-2xl focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <FiMenu />
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
            <div
                onClick={toggleSidebar}
                className="fixed inset-0 bg-black opacity-50 z-40"
            ></div>
        )}

        {/* Search Modal for Small Screens */}
        {isSearchOpen && (
            <div className="fixed top-14 left-0 w-full bg-teal-700 p-4 z-10 shadow-lg">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white px-4 py-2 text-black rounded-sm focus:outline-none"
                    />
                    <button
                        className="ml-4 text-white text-2xl focus:outline-none"
                        onClick={toggleSearch}
                    >
                        <FiX />
                    </button>
                </div>
            </div>
        )}

    </>

};

export default Navbar;
