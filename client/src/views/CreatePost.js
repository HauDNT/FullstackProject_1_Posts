import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import '../styles/CreatePost.scss';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

function CreatePost() {
    let navigate = useNavigate();

    const initialValues = {
        title: '',
        postText: '',
        username: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must type your post's title!"),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    });

    const onSubmit = (data) => {
        axios
            .post('http://localhost:3001/posts', 
                data, 
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
                    navigate(`/`);
                    toast.success("Add new post success!");
                }
            });
    };

    return(
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <Field 
                           autocomplete="off"
                           id='inputCreatePost' 
                           name='title' 
                           placeholder='(Title...)' />
                    <ErrorMessage name="title" component="span" />
                    <br/>

                    <label>Post: </label>
                    <Field 
                           autocomplete="off"
                           id='inputCreatePost' 
                           name='postText' 
                           placeholder='(Post...)' />
                    <ErrorMessage name="postText" component="span" />
                    <br/>

                    <label>Username: </label>
                    <Field 
                           autocomplete="off"
                           id='inputCreatePost' 
                           name='username' 
                           placeholder='(Your username...)' />
                    <ErrorMessage name="username" component="span" />
                    <br/>

                    <button className="btn-createpost" type="submit">Create post!</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;