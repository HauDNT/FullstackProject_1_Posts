import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../styles/Post.scss';
import { toast } from 'react-toastify';

function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});           // Một bài Post là một đối tượng
    const [commentsObject, setCommentsObject] = useState([]);   // Comments có rất nhiều nên nó là một mảng.
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPostObject(res.data);
        });
        axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
            setCommentsObject(res.data);
        });
    }, [id]);

    const addComment = () => {
        if (newComment !== "") {
            axios
                .post("http://localhost:3001/comments", {
                    commentBody: newComment, 
                    PostId: id,
                }, 
                {
                    // Authen token:
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                })
                .then((res) => {
                    if (res.data.error) {
                        toast.error("You must login!");
                    }
                    else {
                        const commentAdded = {commentBody: newComment, username: res.data.username};
                        setCommentsObject([...commentsObject, commentAdded]);
                        setNewComment("");
                        toast.success("Comment success!");
                    }
                });
        }
        else {
            toast.error("You must type something!");
        }
    }

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="invidual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="listOfComments">
                    {commentsObject.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                { comment.commentBody }
                                <label> - {comment.username}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="addCommentContainer">
                    <input type="text" value={newComment} placeholder="Comment..." autoComplete="off" onChange={(e) => {
                        setNewComment(e.target.value);
                    }} />
                    <button onClick={addComment} type="submit">Add comment</button>
                </div>
            </div>
        </div>
    );
}

export default Post;