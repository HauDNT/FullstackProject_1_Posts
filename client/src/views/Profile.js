import React, {useEffect, useState, useContext} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
    let {id} = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const {authState} = useContext(AuthContext);

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
    }, [id]);

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {username}</h1>
                {
                    authState.username === username &&
                    <button onClick={() => {navigate('/changepassword')}}>
                        Change password
                    </button>
                }
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