import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Comments({ match, history }) {
    const id = match.params.id;

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState({
        text: ""
    });

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err)
            });

        axios
            .get(`http://localhost:4000/api/posts/${id}/comments`)
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                setComments([{
                    id: Date.now(),
                    text: "No comments on this post"
                }])
            })
    },[]);

    const changeHandler = (e) => {
        e.preventDefault();
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value
        })
    };

    const submitHandler = (e) => {
      e.preventDefault();
      axios
          .post(`http://localhost:4000/api/posts/${id}/comments`, newComment)
          .then(res => {
              console.log(res);
              history.push('/')
          })
          .catch(err => {
              console.log(err)
          })
    };

    if (!post || !comments) {
        return (
            <h1 className="title">Loading...</h1>
        )
    }

    return (
        <div className="commentComponent">
            <div className="post">
           <h1 className="postTitle">{post[0].title}</h1>
            <h1 className="postTitle">{post[0].contents}</h1>
            </div>
                {comments.map((item) => {
                return (
                    <div className="card comment" key={item.id}>
                        <h1>{item.text}</h1>
                    </div>
                )
            })}
            <form className="createForm" onSubmit={submitHandler}>
                <input className="input updateComment" type="text"
                       name="text"
                       placeholder="Enter new comment"
                       value={newComment.text}
                       onChange={changeHandler}
                       />
                       <button className="submit" type="submit">Submit</button>
            </form>
            <Link className="btn nav" to={"/"}>Back</Link>
        </div>
    )

}

export default Comments;
