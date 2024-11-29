'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AddPost = () => {

  const [communityList, setCommunityList] = useState([]);

  const router = useRouter();

  const postForm = useFormik({
    initialValues: {
      title: '',
      caption: '',
      image: '',
      community: '',
      uploadedBy: ''
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios.post('http://localhost:5000/post/add', values)
        .then((result) => {
          toast.success('Post Added Successfully');
          resetForm();
          router.push('/feed');
        }).catch((err) => {
          console.log(err);
          toast.error('Some Error Occured');
        });

      resetForm();
    }
  })

  const fetchCommunity = async () => {
    const res = await axios.get('http://localhost:5000/community/getall');
    console.log(res.data);
    setCommunityList(res.data);
  }

  useEffect(() => {
    fetchCommunity();
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
        // setPreviewUrl(result.data.url);
        postForm.setFieldValue('image', result.data.url);

      }).catch((err) => {
        console.log(err);
        toast.error('File upload Failed');


      });
  }

  return (
    <div className="relative">
      <img
              src="https://huongnam.vn/wp-content/uploads/2020/03/Social-media-huongnamads.jpeg"

        // src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                The quick, brown fox <br className="hidden md:block" />
                jumps over a{' '}
                <span className="text-teal-accent-400">lazy dog</span>
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                connects with more peoples and build your community.
              </p>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Add New Post
                </h3>
                <form onSubmit={postForm.handleSubmit}>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="firstName"
                      className="inline-block mb-1 font-medium"
                    >
                      Post Title
                    </label>
                    <input
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="title"
                      onChange={postForm.handleChange}
                      value={postForm.values.title}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="lastName"
                      className="inline-block mb-1 font-medium"
                    >
                      caption
                    </label>
                    <input
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="caption"
                      onChange={postForm.handleChange}
                      value={postForm.values.caption}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mb-1 font-medium"
                    >
                      image
                    </label>
                    <input
                      required
                      type="file"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      onChange={uploadfile}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="lastName"
                      className="inline-block mb-1 font-medium"
                    >
                      community
                    </label>
                    <select
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="community"
                      onChange={postForm.handleChange}
                      value={postForm.values.community}
                    >
                      {
                        communityList.map(community => (
                          <option value={community.name}>{community.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mb-1 font-medium"
                    >
                      uploadedBy
                    </label>
                    <input
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="uploadedBy"
                      onChange={postForm.handleChange}
                      value={postForm.values.uploadedBy}
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">

                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                    >
                      Publish
                    </button>
                  </div>
                  <p className="text-xs text-black-600 sm:text-sm">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost;