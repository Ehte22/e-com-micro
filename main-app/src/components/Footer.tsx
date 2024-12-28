import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'; // Social media icons
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-teal-700 text-white py-8 mt-12 md:px-12 lg:px-20">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-x-20">
                    {/* Company Info Section */}
                    <div className="w-full mb-6 lg:mb-0">
                        <h3 className="text-xl font-semibold mb-3">E-Commerce</h3>
                        <p className="text-gray-300">
                            Your one-stop shop for the best products at affordable prices.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="w-full mb-6 lg:mb-0">
                        <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-gray-300">Home</Link>
                            </li>
                            <li>
                                <Link to="/product/products" className="hover:text-gray-300">Products</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="hover:text-gray-300">Cart</Link>
                            </li>
                            <li>
                                <Link to="/order" className="hover:text-gray-300">Orders</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div className="w-full mb-6 lg:mb-0">
                        <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link to="https://facebook.com" className="text-white hover:text-gray-300">
                                <FiFacebook size={24} />
                            </Link>
                            <Link to="https://twitter.com" className="text-white hover:text-gray-300">
                                <FiTwitter size={24} />
                            </Link>
                            <Link to="https://instagram.com" className="text-white hover:text-gray-300">
                                <FiInstagram size={24} />
                            </Link>
                            <Link to="https://linkedin.com" className="text-white hover:text-gray-300">
                                <FiLinkedin size={24} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-4">
                    <p className="text-center text-gray-300">
                        &copy; {new Date().getFullYear()} E-Commerce. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
