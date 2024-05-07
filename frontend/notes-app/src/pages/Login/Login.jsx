import React, { useState } from 'react'
import Navbar from '../../components/nav/NavbarPlain'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address.")
            return;
        }

        if(!password){
            setError("Please enter the password.")
            return;
        }

        setError("")

        // Login API call
        try{
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            if (response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate('/dashboard');
            }
        } catch (error) {
            // Login Error
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }

        }

    }
    return ( 
    <>
        <header className='sticky top-0 z-50 w-[100vw] bg-white/90 border'>
            <Navbar/>
        </header>
        

        <main className='animate-in login-box w-[80%] mx-auto'>

            <div className='flex items-center justify-center mt-20'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Login</h4>

                        <input type='text' placeholder='Email' className='input-box' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary'>Login</button>
                        
                        {/* <p className='text-sm text-center mt-2'>Forgot your password?{" "}
                            <span className='font-medium text-primary underline' >Reset</span>
                        </p> */}

                        <p className='text-sm text-center mt-4'>Not registered yet?{" "}
                            <Link to='/signup' className='font-medium text-primary underline'>Sign Up</Link>
                        </p>

                        
                    </form>
                </div>
            </div>
        </main>

        {/* <div className='forgot-email-box w-[80%] mx-auto'>

            <div className='flex items-center justify-center mt-20'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Forgot Password</h4>

                        <input 
                            type='text' 
                            placeholder='Name' 
                            className='input-box'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input 
                            type='text' 
                            placeholder='Email' 
                            className='input-box' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary'>Reset</button>

                        
                    </form>
                </div>
            </div>
        </div>

        <div className='forgot-otp-box w-[80%] mx-auto'>

            <div className='flex items-center justify-center mt-20'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Forgot Password</h4>

                        <p className='text-sm mb-2'>Enter the code sent to <span className='text-primary'>{email}</span></p>
                        <div className='otp-box grid grid-cols-4 gap-2 items-center justify-center text-center mb-2'>
                            <input type='number' className='input-box text-center text-lg' />
                            <input type='number' className='input-box text-center text-lg' />
                            <input type='number' className='input-box text-center text-lg' />
                            <input type='number' className='input-box text-center text-lg' />

                        </div>

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary'>Reset</button>

                        
                    </form>
                </div>
            </div>
        </div>

        <div className='forgot-pw-box w-[80%] mx-auto'>

            <div className='flex items-center justify-center mt-20'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Set New Password</h4>

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary'>Reset</button>

                        
                    </form>
                </div>
            </div>
        </div> */}
    </>
    )
}

export default Login