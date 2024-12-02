'use client';
import { IconShare3, IconThumbUp } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Post = ({ post, refresh }) => {

  const addLike = async (id) => {
    await axios.put('http://localhost:5000/post/update/' + id, { likes: post.likes + 1 });
    refresh();
  }

  return <>

    <div className="mb-4 group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">

        <img src={post.image} alt={post.caption} className="w-full object-cover rounded-t-xl" />
      </div>
      <div className="p-4 md:p-6">
        <span className="block mb-1 text-xs font-semibold text-blue-600 dark:text-blue-500">
          {post.uploadedBy}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
          {post.title}
        </h3>
        <p className="mt-3 text-gray-500 dark:text-neutral-500">
          {post.caption}
        </p>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
        <button
          onClick={() => addLike(post._id)}
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"

        >
          <IconThumbUp /> Like ({post.likes})
        </button>
        <button
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          <IconShare3 /> Share
        </button>
      </div>
    </div>
  </>
};

function Feed() {

  const [postList, setPostList] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  const [selCommunity, setSelCommunity] = useState('');
  const [masterList, setMasterList] = useState([]);

  const fetchCommunities = async () => {
    const res = await axios.get('http://localhost:5000/community/getall')
    console.log(res.data);
    setCommunityList(res.data);
    setSelCommunity(res.data[0]?.name);
  }

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/post/getall')
    console.log(res.data);
    setPostList(res.data);
    setMasterList(res.data);
  }

  useEffect(() => {
    fetchPosts();
    fetchCommunities();
  }, [])

  useEffect(() => {
    console.log(selCommunity);

    if (!selCommunity) {
      setPostList([]);
      return;
    }

    setPostList(
      masterList.filter(post => (
        post.community === selCommunity
      ))
    )
  }, [selCommunity])


  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow py-4 mb-6">
        <h1 className="text-center text-3xl font-bold">Insta Feed</h1>
      </header>
      <main className="max-w-xl mx-auto">

        <select className='w-full py-1 px-3 rounded mb-5' value={selCommunity} onChange={e => setSelCommunity(e.target.value)} >
          {
            communityList.map((community) => (
              <option value={community.name}>{community.name}</option>
            ))
          }
        </select>

        {postList.map((post) => (
          <Post key={post.id} post={post} refresh={fetchPosts} />
        ))}



      </main>
    </div>
  );
}

export default Feed;