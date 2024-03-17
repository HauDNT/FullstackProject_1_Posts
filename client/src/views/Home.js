import React, { useContext } from "react";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { toast } from "react-toastify";
import {AuthContext} from '../helpers/AuthContext';

function Home() {
    let navigate = useNavigate();
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        if (!localStorage.getItem("accessToken") && !authState.status) {
            navigate('/login');
        }
        else {
            axios
                .get('http://localhost:3001/posts/', {headers: {accessToken: localStorage.getItem("accessToken")}})
                .then((res) => {
                    setListOfPosts(res.data.listOfPosts);
                    setLikedPosts(res.data.likedPosts.map((like) => {return like.PostId}));
                });
            }
    }, []);

    const likeAPost = (postId) => {
        axios
            .post('http://localhost:3001/likes', 
                    {PostId: postId}, 
                    {headers: {accessToken: localStorage.getItem('accessToken')}}
            )
            .then((res) => {
                setListOfPosts(
                    listOfPosts.map((post) => {
                        if (post.id === postId) {
                            if (res.data.liked)
                                return {...post, Likes: [...post.Likes, 0]};
                            else 
                                return {...post, Likes: post.Likes.slice(0, -1)};
                                // Tạo ra một bản sao của mảng Likes mà không làm thay đổi mảng gốc.
                                // Loại bỏ phần tử cuối cùng và trả về mảng mới này mà không ảnh hưởng đến mảng gốc.
                        } else {
                            return post;
                        }
                    })
                );

                if (localStorage.getItem("accessToken") && likedPosts.includes(postId)) {
                    setLikedPosts(likedPosts.filter((id) => {return id !== postId}))
                } else {
                    setLikedPosts([...likedPosts, postId]);
                }
            });
    }

    return(
        <>
            {listOfPosts.map((value, key) => {
                return (
                    <div key={key} className='post'>
                        <div className='title' onClick={() => {navigate(`/post/${value.id}`)}}>{value.title}</div>
                        <div className='body' onClick={() => {navigate(`/post/${value.id}`)}}>
                            {value.postText}
                        </div>
                        <div className='footer'>
                            {value.username}
                            <ThumbUpIcon 
                                onClick={() => {likeAPost(value.id)}} 
                            />

                            <label>{value.Likes.length}</label>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Home;