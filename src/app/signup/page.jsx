'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const Signup = () => {

    const router = useRouter();

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            axios.post('http://localhost:5000/user/add', values)
                .then((response) => {
                    toast.success('User Registered Successfully');
                    router.push('/login');
                }).catch((err) => {
                    console.log(err);
                    toast.success('Something went wrong');
                });

            resetForm();
        }
    })

    return (
        <div>
            <div className='max-w-lg rounded-lg border shadow mx-auto mt-5 py-6 px-5'>
                <h3 className='text-2xl text-center font-bold'>Signup Form</h3>

                <form onSubmit={signupForm.handleSubmit}>

                    <div className='mb-5'>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.name}
                            className='w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 text-black'
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.email}
                            className='w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 text-black'
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={signupForm.handleChange}
                            value={signupForm.values.password}
                            className='w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 text-black'
                        />
                    </div>

                    <button type='submit' className='mt-5 bg-violet-500 p-3 w-full text-white rounded-lg'>Submit</button>

                </form>
            </div>
        </div>
    )
}

export default Signup;