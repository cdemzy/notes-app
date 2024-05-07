import React, { useState } from 'react'
import Navbar from '../../components/nav/NavbarPlain';
import PasswordInput from '../../components/input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Signup = () => {

    const [otp, setOtp] = useState(['', '', '', '']);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        if (value.match(/^[0-9]$/)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== '' && index < 3) {
                // Move focus to the next input
                inputRefs[index + 1].current.focus();
            }
        }
    };

    const handleBackspace = (index) => {
        if (index > 0 && otp[index] === '') {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            // Move focus to the previous input
            inputRefs[index - 1].current.focus();
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

         // Capitalize the full name
        const capitalizedFullName = name.replace(/\b\w/g, (char) => char.toUpperCase());


        if(!name){
            setError("Please enter your name.");
            return;
        }

        if(!validateEmail(email)){
            setError("Please enter your email address.");
            return;
        }

        if(!password){
            setError("Please enter the password.");
            return;
        }

        if (
            password.toLowerCase().includes(name.toLowerCase()) ||
            password.toLowerCase().includes(email.toLowerCase())
        ) {
            setError("Password cannot contain text from your name or email.");
            return;
        }

        if (password.length < 7){
            setError("Password has to be atleast 8 characters.");
            return;
        }

        setError(" ");

        // Sign up API Call
        try{
            const response = await axiosInstance.post("/create-account", {
                fullName: capitalizedFullName,
                email: email,
                password: password,
            });

            // Handle Successful Singup Response
            if (response.data && response.data.error){
                set(response.data.message);
                return;
            }

            if (response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate('/dashboard');
            }

        } catch (error) {

            // Handle Signup Response
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }

        }
    }

  return ( <>
        <header className='sticky top-0 z-50 w-[100vw] bg-white/90 border'>
            <Navbar/>
        </header>

        <main className='animate-in flex items-center justify-center mt-20'>
            <div className='w-96 border rounded bg-white px-7 py-10 h-max '>
                <form onSubmit={ handleSignup }>
                    <h4 className='text-2xl mb-7'>Sign Up</h4>

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

                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='btn-primary'>Create Account</button>

                    <p className='text-sm text-center mt-4'>Already have an account?{" "}
                        <Link to='/login' className='font-medium text-primary underline'>Login</Link>
                    </p>

                </form>

                {/* <form onSubmit={handleSignup} className='otp-box w-full'>
                        <h4 className='text-2xl mb-7'>Email Verification</h4>

                        <p className='text-sm mb-2'>Enter the code sent to <span className='text-primary'>{email}</span></p>
                        <div className='otp-box grid grid-cols-4 gap-2 items-center justify-center text-center mb-2'>
                            <input type='number' className='input-box text-center text-lg' />
                            <input type='number' className='input-box text-center text-lg' />
                            <input type='number' className='input-box text-center text-lg' />
                            <input type='number' className='input-box text-center text-lg' />

                        </div>

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary'>Verify</button>

                        
                </form>  */}
            </div>
        </main>

        
    </>
  )
}

export default Signup