import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../styles/Post.scss';

function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    let count = 0;

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/postId/${id}`).then((res) => {
            setPostObject(res.data);
            console.log(count++);
      });
    }, [id]);

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="invidual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide"></div>
        </div>
    );
}

export default Post;