import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './PostD.scss'

const PostD = ({setUser,setProfile}) => {
    const value=localStorage.getItem('Auth')
    const {id}=useParams();
    // console.log(id);
    const [post,setData]=useState({})
    useEffect(()=>{
        postDetails();
    },[])
    const postDetails=async()=>{
        if(value!==null){
        try {
          const res=await axios.get(`http://localhost:3000/api/postdetails/${id}`,{headers:{"Authorization":`Bearer ${value}`}})
        if (res.status==200) {
          console.log(res.data);
          setUser(res.data.username);
            setProfile(res.data.profile);
          setData(res.data.post)
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
      console.log(post.photos);
      
  return (
    <div className='PostD'>
      <div className="left">
            {/* {post.photos.map((photo,ind)=><img src={photo} key={ind} alt='post'/>)} */}
      </div>
      <div className="right">
        <label htmlFor="desc">
            Description:
        </label>
       <h3 id='desc'>{post.description}</h3>
        <label htmlFor="date">Date:</label>
       <h3 id='date'>{post.postDate}</h3>
        <label htmlFor="time">Time:</label>
       <h3 id='time'>{post.postTime}</h3>
      </div>
    </div>
  )
}

export default PostD
