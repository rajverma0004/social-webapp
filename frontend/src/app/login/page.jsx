'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';


const Login = () => {
    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            axios.post('http://localhost:5000/user/authenticate', values)
                .then((response) => {
                    toast.success('User Logedin Successfully');
                    localStorage.setItem('token', response.data.token);
                    router.push('/add-post');
                }).catch((err) => {
                    console.log(err);
                    toast.error('Something went wrong');
                });

            resetForm();
        }
    })

    return (
        <div className='bg-cover pt-10 min-h-screen' style={{backgroundImage: `url('https://www.searchenginejournal.com/wp-content/uploads/2021/08/top-5-reasons-why-you-need-a-social-media-manager-616015983b3ba-sej-1280x720.png')`}}>
            <div className='max-w-md rounded-lg border shadow mx-auto mt-5 py-6 px-5 bg-white'>
                <h3 className='text-2xl my-6 text-center font-bold'>Login Form</h3>

                <form onSubmit={loginForm.handleSubmit}>

                    <div className='mb-5'>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            onChange={loginForm.handleChange}
                            value={loginForm.values.email}
                            className='w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 text-black'
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={loginForm.handleChange}
                            value={loginForm.values.password}
                            className='w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 text-black'
                        />
                    </div>

                    <Link href="/signup" className='text-violet-500'>Not Registered Yet? Register Here</Link>

                    <button type='submit' className='mt-5 bg-violet-500 p-3 w-full text-white rounded-lg'>Submit</button>

                </form>
            </div>
        </div>
    )
}

export default Login;