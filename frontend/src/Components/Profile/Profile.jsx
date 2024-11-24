import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss'

const Profile = ({setUser,setProfile}) => {
    const navigate=useNavigate();
    const value=localStorage.getItem('Auth');
    const [user,setData]=useState({})
    const [posts,setPost]=useState([])
    useEffect(()=>{
        getDetails();
        getPosts();
      },[])
    const getDetails=async()=>{
        if(value!==null){
        try {
          const res=await axios.get("http://localhost:3000/api/profile",{headers:{"Authorization":`Bearer ${value}`}})
        if (res.status==200) {
          // setUserName(res.data.username);
          setUser(res.data.username);
          setProfile(res.data.profile.profile);
          setData(res.data.profile)
        }else if (res.status==403){
          alert(res.data.msg);
          navigate('/login')
        }
        else{
          navigate('/login')
        }
        } catch (error) {
          console.log("error");
          navigate('/login')
        }
        }else{
          navigate('/login')
        }
      }
    const getPosts=async()=>{
      const res=await axios.get("http://localhost:3000/api/getPost",{headers:{"Authorization":`Bearer ${value}`}})
      // console.log(res.data);
      setPost(res.data)
    }
  return (
    <div className='Profile'>
      <div className="left">
        <div className="top">
          <img src={user.profile} alt="" />
          <div className="details">
            <h2>{user.name}</h2>
            <h3>{user.dob}</h3>
            <p>{user.bio}</p>
          </div>
        </div>
        <div className="bottom">
            <button onClick={()=>navigate('/addpost')}>Add Posts</button>
            <button onClick={()=>navigate('/addprodetails')}>Edit detail</button>
            <button >Delete Account</button>
        </div>
      </div>
      <div className="right">
          {posts.map((post)=> <div className='post' key={post._id}>
              <img src={post.photo} alt="" />
             
            </div>
            )}
      </div>
    </div>
  )
}

export default Profile
