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

    return(
        <>
            {listOfPosts.map((value, key) => {
                return (
                    <div key={key} className='post' onClick={() => {navigate(`/post/${value.id}`)}}>
                        <div className='title'>{value.title}</div>
                        <div className='body'>{value.postText}</div>
                        <div className='footer'>{value.username}</div>
                    </div>
                )
            })}
        </>
    )
}

export default Home;