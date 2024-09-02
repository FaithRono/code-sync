import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginIcons from "../assest/signin.gif"; 
import { Link } from 'react-router-dom';


const LoginPage = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here, e.g., API call to authenticate user
        // For now, assuming login is successful:
        navigate('/welcome'); // Redirect to WelcomePage
    };

    return (
        <section id='login' className='pt-20'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-4 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='Login icons' />
                        <button 
                            className='bg-slate-300 hover:bg-slate-500 text-black px-2 py-1 rounded-full hover:scale-110 transition-all relative left-14'
                            style={{ whiteSpace: 'nowrap', cursor: 'pointer', marginTop: '22px' }}>
                            Upload Photo
                        </button>
                    </div>

                    <form className='pt-14' onSubmit={handleLogin}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='flex items-center mt-2'>
                            <input
                                type='checkbox'
                                id='showPassword'
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                                className='mr-2'
                            />
                            <label htmlFor='showPassword'>Show Password</label>
                        </div>

                        <Link
                            to={'/forgot-password'}
                            className='block w-fit ml-auto hover:underline hover:text-red-600'
                        >
                            Forgot Password?
                        </Link>

                        <button
                            type='submit'
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Login
                        </button>
                    </form>

                    <p className='my-5'>
                        Don't have an account?{' '}
                        <Link to={'/register'} className='hover:text-red-600 hover:underline'>
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
