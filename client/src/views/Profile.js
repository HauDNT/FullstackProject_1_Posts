import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Profile() {
    let {id} = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/profile/${id}`)
            .then((res) => {
                setUsername(res.data.username)
            });

        axios
            .get(`http://localhost:3001/posts/userId/${id}`)
            .then((res) => {
                setListOfPosts(res.data);
            });
    }, []);

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {username}</h1>
            </div>
            <div className="listOfPosts">
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className='post'>
                            <div className='title'>{value.title}</div>
                            <div className='body'>{value.postText}</div>
                            <div className='footer'>
                                {value.username}
                                <ThumbUpIcon className="like-icon"/>
                                <label className="like-number">{value.Likes.length}</label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile;