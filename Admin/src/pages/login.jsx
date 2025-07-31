import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminIllustration from '../assets/logo.png'; // Replace with your image
import logo from '../assets/logo.png'; // Replace with your logo

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Invalid credentials. Please try again.');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-screen  bg-gray-50 ">
            {/* Left side - Illustration */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12">
                <div className="max-w-md">
                    <img 
                        src={adminIllustration} 
                        alt="Admin Illustration"
                        className="w-full h-auto"/>
                    <h2 className="mt-8 text-2xl font-bold text-gray-800">Welcome Back!</h2>
                    <p className="mt-2 text-gray-600">
                        Streamline your workflow with our powerful admin dashboard. Manage your content, users, and analytics all in one place.
                    </p>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <img 
                            src={logo} 
                            alt="Company Logo" 
                            className="h-12 mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
                        <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
                                <svg className="h-5 w-5 text-red-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-red-600">{error}</div>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 text-gray-600 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full pl-10 pr-10 py-3 text-gray-600 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a
   href="mailto:info@unsquare.in?subject=Support%20Request&body=Hello%2C%20I%20am%20facing%20an%20issue%20related%20to%20my%20dashboard.%20Please%20assist%20me%20with%20this%20as%20soon%20as%20possible."
target="_blank"
  rel="noopener noreferrer"
  className="font-medium text-blue-600 hover:text-blue-500"
>
  Forgot password?
</a>

                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : 'Sign in'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                        Don't have an Account?
                                    </span>
                                
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                               <a href="/register"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                Create New Account
                                </a>

                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Unsquare Lab. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;