import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
    let navigate = useNavigate();
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/posts/').then((res) => {
        setListOfPosts(res.data);
      });
    }, []);

    const likeAPost = (postId) => {
        axios
            .post('http://localhost:3001/likes', 
                    {PostId: postId}, 
                    {headers: {accessToken: localStorage.getItem('accessToken')}}
            )
            .then((res) => {
                setListOfPosts(listOfPosts.map((post) => {
                    if (post.id === postId) {
                        if (res.data.liked)
                            return {...post, Likes: [...post.Likes, 0]};
                        else 
                            return {...post, Likes: post.Likes.pop()};
                    } else {
                        return post;
                    }
                }))
            });
    }

    return(
        <>
            {listOfPosts.map((value, key) => {
                return (
                    <div key={key} className='post' onClick={() => {navigate(`/post/${value.id}`)}}>
                        <div className='title'>{value.title}</div>
                        <div className='body'>{value.postText}</div>
                        <div className='footer'>
                            {value.username}
                                <button onClick={() => {likeAPost(value.id)}}>
                                    Like                              
                                </button>
                            <label>{value.Likes.length}</label>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Home;