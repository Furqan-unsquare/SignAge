import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingCart, 
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
  FiImage,
  FiBook
} from 'react-icons/fi';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { path: "/dashboard", name: "Dashboard", icon: <FiHome size={20} /> },
        { path: "/management", name: "Management", icon: <FiMenu size={20} /> },
        { path: "/orders", name: "Orders", icon: <FiShoppingCart size={20} /> },
        { path: "/blog", name: "Blog/Article", icon: <FiBook size={20} /> },
        { path: "/gallery", name: "Galery", icon: <FiImage size={20} /> },
        { path: "/enquiry", name: "Enquiries", icon: <FiMessageSquare size={20} /> },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            {!isDesktop && (
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="fixed z-40 top-2 left-2 p-2 text-black"
                    aria-label="Toggle menu">
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            )}

            {/* Overlay for mobile */}
            {isMobileMenuOpen && !isDesktop && (
                <div 
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Menu */}
            <aside 
                className={`
                    fixed md:sticky top-0 z-40 h-screen
                    bg-white border-r-1 border-gray-200 shadow-lg text-gray-700
                    transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 transition-transform duration-300 ease-in-out
                    w-64 md:w-72 flex-shrink-0
                    overflow-y-auto no-scrollbar
                `}
            >
                <div className="p-6 space-y-6 h-full flex flex-col">
                    {/* Logo & Title */}
                    <div className="flex items-center space-x-3">
                        <img 
                            src={logo} 
                            alt="Company Logo" 
                            className="h-10 w-auto" 
                        />
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center space-x-3 px-4 py-3 rounded-lg
                                    transition-colors duration-200
                                    ${isActive ? 'bg-green-500 text-white font-medium' : 'hover:bg-green-300'}
                                `}
                                onClick={() => !isDesktop && setIsMobileMenuOpen(false)}
                            >
                                <span className="text-current">{item.icon}</span>
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={`
                            flex items-center justify-start space-x-2
                            mt-auto py-3 px-4 rounded-lg font-medium
                            hover:bg-gray hover:text-black transition-colors duration-200
                        `}>
                        <FiLogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;