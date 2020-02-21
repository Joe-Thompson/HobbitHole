import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [posts, setPosts] = useState(null);
    const [newPost, setNewPost] = useState({
        title: "",
        contents: ""
    });

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/posts")
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[]);

    const changeHandler = (e) => {
      e.preventDefault();
      setNewPost({
          ...newPost,
          [e.target.name]: e.target.value
      })
    };

    const submitHandler = (e) => {
      e.preventDefault();
      axios
          .post("http://localhost:4000/api/posts", newPost)
          .then(res => {
              console.log(res);
              window.location.reload();
          })
          .catch(err => {
              console.log(err)
          })

    };

    if (!posts) {
        return (
            <h1 className="title">Loading....</h1>
        )}
        return (
        <div>
            <h1 className="title">Middle Earth - Who's line is it?</h1>

            <h1 className="title label">Create new Post</h1>
            <form className="createForm" onSubmit={submitHandler}>
                <input className="input" type="text" name="title" value={newPost.title} placeholder="Please enter Title" onChange={changeHandler} />
                <input className="input" type="text" name="contents" value={newPost.contents} placeholder="Please enter Content" onChange={changeHandler} />
                <button className="submit" type="submit">Submit</button>
            </form>

            {posts.map((item) => {
                return (
                    <div className="container">
                    <div className="card" key={item.id}>
                        <h1>{item.title}</h1>
                        <h2>{item.contents}</h2>
                        <Link className="btn" to={`/updatePost/${item.id}`}>Update</Link>
                        <Link className="btn" to={`/comments/${item.id}`}>View Comments</Link>
                    </div>
                    </div>
                )
            })}
            <Link className="btn nav" onClick={() => { window.location.reload()}} to={"/"}>Back to Top</Link>
        </div>
    )
}

export default Dashboard;
