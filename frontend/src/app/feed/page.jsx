'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Post = ({ post }) => (
  <div className="bg-white shadow rounded-lg mb-6">
    {/* Post Header */}
    <div className="flex items-center p-4">
      <p>Posted By : </p>
      <span className="font-semibold">{post.uploadedBy}</span>
    </div>

    <div className='p-4'>
      <h3 className='text-lg text-gray-600'>{post.community}</h3>
    </div>

    <div className='p-4'>
      <h2 className='text-xl font-bold'>{post.title}</h2>
    </div>

    {/* Post Image */}
    <img src={post.image} alt={post.caption} className="w-full" />

    {/* Post Content */}
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{post.likes} likes</span>
        <button className="text-blue-500">Like</button>
      </div>
      <p>
        <span className="font-semibold">{post.user}</span> {post.caption}
      </p>
    </div>
  </div>
);

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
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
}

export default Feed;