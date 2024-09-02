import React, { useState } from 'react';
import loginIcons from '../assets/signin.gif'; // Ensure this path is correct
import { Link } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profilePic: '',
        name: '' // Added name field
    });
    const [showPassword, setShowPassword] = useState(false);

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

    return (
        <section id='register' className='pt-20'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-4 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto overflow-hidden rounded-full'>
                        <img src={loginIcons} alt='Login icons' />
                        <div>Upload Photo</div>
                    </div>

                    <form className='pt-14'>
                        <div className='grid'>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>
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
                        <div>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Confirm password'
                                    name='confirmPassword'
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
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Register
                        </button>
                    </form>
                    <p className='my-5'>
                        Already have an account?{' '}
                        <Link to={'/login'} className='hover:text-red-600 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;
