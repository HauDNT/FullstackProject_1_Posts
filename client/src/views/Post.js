import React, {useEffect, useState, useContext} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/Post.scss';
import { toast } from 'react-toastify';
import { AuthContext } from "../helpers/AuthContext";

function Post() {
    let {id} = useParams();
    let navigate = useNavigate();
    const [postObject, setPostObject] = useState({});           // Một bài Post là một đối tượng
    const [commentsObject, setCommentsObject] = useState([]);   // Comments có rất nhiều nên nó là một mảng.
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);

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
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {headers: {accessToken: localStorage.getItem("accessToken")}})
            .then(() => {
                setCommentsObject(commentsObject.filter((val) => {
                    return val.id !== id;
                }));
            })
            // Cập nhật commentsObject bằng cách lọc ra các bình luận với id không trùng với id của bình luận được xóa. 
            // Điều này sẽ xóa bình luận được xóa khỏi mảng commentsObject.
    };

    const handleDeletePost = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, 
                    {headers: {accessToken: localStorage.getItem("accessToken")},
            })
            .then(() => {
                navigate('/');
            });
    };

    const editPost = (option) => {
        if (option === 'title') {
            let newTitle = prompt("Enter new title: ");

            axios
                .put("http://localhost:3001/posts/title", 
                    {newTitle: newTitle, id: id},
                    {headers: {accessToken: localStorage.getItem("accessToken")}});

                setPostObject({...postObject, title: newTitle});
                toast.success("Update title success!");
        } else {
            let newPostText = prompt("Enter new post text: ");

            axios
                .put("http://localhost:3001/posts/postText", 
                    {newText: newPostText, id: id},
                    {headers: {accessToken: localStorage.getItem("accessToken")}});
                
                setPostObject({...postObject, postText: newPostText});
                toast.success("Updated post text success!");
        }
    }

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="invidual">
                    <div className="title" onClick={() => 
                            {
                                if (authState.username === postObject.username) 
                                    editPost('title');
                            }
                        }>
                        {postObject.title}
                    </div>
                    
                    <div className="body" onClick={() => 
                            {
                                if (authState.username === postObject.username) 
                                    editPost('body');
                            }
                        }>
                        {postObject.postText}
                    </div>

                    <div className="footer">
                        {postObject.username}
                        {
                            authState.username === postObject.username &&
                            <button onClick={() => handleDeletePost(postObject.id)}>Delete</button>
                        }
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="listOfComments">
                    {commentsObject.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                { comment.commentBody }
                                <label> - {comment.username}</label>
                                
                                {/* Kiểm tra nếu username trong AuthContext là username của comment này thì hiện nút 'Xóa' */}
                                {authState.username === comment.username && <button onClick={(e) => {deleteComment(comment.id)}}>X</button>}
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