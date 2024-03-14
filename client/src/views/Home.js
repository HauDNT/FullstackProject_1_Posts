import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
                            return {...post, Likes: post.Likes.slice(0, -1)};
                            // Tạo ra một bản sao của mảng Likes mà không làm thay đổi mảng gốc.
                            // Loại bỏ phần tử cuối cùng và trả về mảng mới này mà không ảnh hưởng đến mảng gốc.
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
                    <div key={key} className='post'>
                        <div className='title' onClick={() => {navigate(`/post/${value.id}`)}}>{value.title}</div>
                        <div className='body' onClick={() => {navigate(`/post/${value.id}`)}}>{value.postText}</div>
                        <div className='footer'>
                            {value.username}
                            <ThumbUpIcon onClick={() => {likeAPost(value.id)}} />

                            <label>{value.Likes.length}</label>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Home;