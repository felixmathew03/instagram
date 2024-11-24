import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Post.scss'

const Post = ({setUser,setProfile}) => {
   
    
    const navigate=useNavigate();
  const value=localStorage.getItem('Auth');
  const [post,setPost]=useState({
    userId:"",
    description:"",
    photo:""
  });
  useEffect(()=>{
    getDetails();
  },[])
const getDetails=async()=>{
    if(value!==null){
    try {
      const res=await axios.get("http://localhost:3000/api/profile",{headers:{"Authorization":`Bearer ${value}`}})
      console.log(res);
      
    if (res.status==200) {
      // setUserName(res.data.username);
      console.log("fff");
      
      console.log(res.data);
      setUser(res.data.username);
      setProfile(res.data.profile.profile);
      setPost({userId:res.data.profile.userId})
    }else if (res.status==403){
      alert(res.data.msg);
    //   navigate('/login')
    }
    else{
    //   navigate('/login')
    }
    } catch (error) {
      console.log("error");
    //   navigate('/login')
    }
    }else{
    //   navigate('/login')
    }
  }
    // Handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(post);
    const res=await axios.post("http://localhost:3000/api/addpost",post,{Headers:{"Content-Type":"application/json"}});
    console.log(res);
    if(res.status==201){
      alert(res.data.msg)
      navigate('/profile')
    }else{
      alert(res.data.msg)
    }
  };
  // console.log(user);
  
  const handleChange=(e)=>{
    // console.log(e.target.value);
    setPost((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  // Handle image change
  const handleFile=async(e)=>{
    // console.log(e.target.files[0]);
    const photo=await convertToBase64(e.target.files[0])
    // console.log(profile);
    setPost((pre)=>({...pre,photo:photo}))
  }
  function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
  }
  return (
    <div className='Post'>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Photo:</label>
          <input type="file" onChange={handleFile} accept="image/*"  />
          {post.photo && <img src={post.photo} alt="Profile" style={{ width: '100px', height: '100px', marginTop: '10px',objectFit:'cover' }} />}
        </div>
        <div>
          <label>Description:</label>
          <textarea value={post.bio} name='description' onChange={handleChange} placeholder="Description" />
        </div>
        
        <button type="submit">Add Post</button>
      </form>
    </div>
  )
}

export default Post
