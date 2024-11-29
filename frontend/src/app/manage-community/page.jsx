'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageCommunity = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const [communityList, setCommunityList] = useState([]);
    const router = useRouter();

    const fetchCommunities = async () => {
        const res = await axios.get('http://localhost:5000/community/getall');
        console.log(res.data);
        setCommunityList(res.data);

    }

    const addCommunity = () => {
        axios.post('http://localhost:5000/community/add', {
            name,
            cover: image
        })
            .then((result) => {
                toast.success('Community Added');
                fetchCommunities();
            }).catch((err) => {
                console.log(err);
                toast.error('something went wrong')
            });
    }

    const deleteCommunity = (id) => {
        axios.delete('http://localhost:5000/community/delete/' + id)
            .then((result) => {
                toast.success('Community deleted');
                // router.push('/feed');
                fetchCommunities();
            }).catch((err) => {
                console.log(err);
                toast.error('something went wrong')
            });
    }

    useEffect(() => {
        fetchCommunities();
    }, [])


    const uploadfile = (e) => {
        const file = e.target.files[0];

        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('upload_preset', 'myuploadpreset');
        formdata.append('cloud_name', 'dib241c4k')

        axios.post('https://api.cloudinary.com/v1_1/dib241c4k/image/upload', formdata)
            .then((result) => {
                toast.success('File Uploaded Successfully');
                console.log(result.data);
                setImage(result.data.url);

            }).catch((err) => {
                console.log(err);
                toast.error('File upload Failed');


            });
    }

    return (
        <div>
            <>
                {/* Table Section */}
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="bg-white p-4 border border-gray-200 mb-6 rounded-xl shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
                        {
                            image && (
                                <img className='h-60 w-full object-cover my-3 rounded-lg' src={image} alt="" />
                            )
                        }
                        <div className='grid grid-cols-12 gap-4'>
                            <input type="file" onChange={uploadfile} className='border p-3 col-span-4 rounded-lg' />
                            <input value={name} onChange={e => setName(e.target.value)} placeholder='Enter Community Name...' type="text" className='border p-3 col-span-6 rounded-lg' />
                            <button
                                onClick={addCommunity}
                                disabled={!image || !name}
                                className='bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 col-span-2 text-white rounded-lg'>Create Community</button>
                        </div>
                    </div>
                    {/* Card */}
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                                    {/* Header */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                                Communities
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                Add new communities
                                            </p>
                                        </div>

                                    </div>
                                    {/* End Header */}
                                    {/* Table */}
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                        <thead className="bg-gray-50 dark:bg-neutral-800">
                                            <tr>
                                                <th scope="col" className="ps-6 py-3 text-start">
                                                    <label
                                                        htmlFor="hs-at-with-checkboxes-main"
                                                        className="flex"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            id="hs-at-with-checkboxes-main"
                                                        />
                                                        <span className="sr-only">Checkbox</span>
                                                    </label>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                                                >
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                            Cover Image
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                            Community Name
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-start">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                            Created
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-end" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                            {
                                                communityList.map(community => (

                                                    <tr>
                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="ps-6 py-3">
                                                                <label htmlFor="hs-at-with-checkboxes-1" className="flex">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                                        id="hs-at-with-checkboxes-1"
                                                                    />
                                                                    <span className="sr-only">Checkbox</span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                                                <div className="flex items-center gap-x-3">
                                                                    <img
                                                                        className="inline-block h-30"
                                                                        src={community.cover}
                                                                        alt={community.name}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="h-px w-72 whitespace-nowrap">
                                                            <div className="px-6 py-3">
                                                                <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                                                    {community.name}
                                                                </span>

                                                            </div>
                                                        </td>

                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="px-6 py-3">
                                                                <span className="text-sm text-gray-500 dark:text-neutral-500">
                                                                    {new Date(community.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="size-px whitespace-nowrap">
                                                            <div className="px-6 py-1.5">
                                                                <button
                                                                    className="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-red-500"
                                                                    onClick={() => deleteCommunity(community._id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {/* End Table */}
                                    {/* Footer */}
                                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                <span className="font-semibold text-gray-800 dark:text-neutral-200">
                                                    12
                                                </span>{" "}
                                                results
                                            </p>
                                        </div>
                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <button
                                                    type="button"
                                                    className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                                >
                                                    <svg
                                                        className="shrink-0 size-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="m15 18-6-6 6-6" />
                                                    </svg>
                                                    Prev
                                                </button>
                                                <button
                                                    type="button"
                                                    className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                                >
                                                    Next
                                                    <svg
                                                        className="shrink-0 size-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="m9 18 6-6-6-6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Footer */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}
                </div>
                {/* End Table Section */}
            </>

        </div>
    )
}

export default ManageCommunity;