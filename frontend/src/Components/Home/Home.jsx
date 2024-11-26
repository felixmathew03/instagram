import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.scss'

const Home = ({setUser,setProfile}) => {
  const navigate=useNavigate();
  const value=localStorage.getItem('Auth');
  const [posts,setPost]=useState([])
  useEffect(()=>{
    getDetails();
  },[])
  const getDetails=async()=>{
    try {
      if(value!==null){
      const res=await axios.get("http://localhost:3000/api/home",{headers:{"Authorization":`Bearer ${value}`}})
      if (res.status==200) {
        setUser(res.data.username);
        if(res.data.profile)
          setProfile(res.data.profile.profile);
        getPosts();
      }else if (res.status==403){
        alert(res.data.msg);
        navigate('/login')
      }
      else{
        navigate('/login')
      }
    }else{
      navigate('/login')
    }}
     catch (error) {
      console.log("error");
      navigate('/login')
    }
  }
  const getPosts=async()=>{
    const res=await axios.get("http://localhost:3000/api/getposts")
    console.log(res.data);
    setPost(res.data);
  }
  return (
    <div className="Home">
        {
          posts.map(post=> <div className='post' key={post._id}>
              <div className="top">
                {post.photos.map((photo,ind)=> <img src={photo} alt="" key={ind}/>)}
              </div> 
              <div className="bottom">
                <p id={`desc${post._id}`}>{post.description}</p>
              </div>
          </div>)
        }
    </div>
  )
}

export default Home
