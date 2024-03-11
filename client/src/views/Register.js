import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { toast } from "react-toastify";
import '../styles/Register.scss';

function Register() {
    const navigator = useNavigate();
    
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("You must enter your username!"),
        password: Yup.string().min(4).max(20).required("You must enter your password!"),
    });

    const handleRegister = (data) => {
        axios.post("http://localhost:3001/auth/register", data).then((res) => {
            toast.success("Register success! You can login now!");
            navigator(`/login`);
            console.log(data);
        });
    };

    return (
        <div className="registerPage">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
                <Form className="registerContainer">
                    <label>Username: </label>
                    <Field
                        autoComplete="off"
                        id="inputRegister"
                        name="username"
                        placeholder="(Username...)"
                    />
                    <ErrorMessage name="username" component="span"/>

                    <label>Password: </label>
                    <Field
                        autoComplete="off"
                        id="inputRegister"
                        name="password"
                        placeholder="(Password...)"
                    />
                    <ErrorMessage name="password" component="span"/>

                    <button className="btn-register" type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    );
}


export default Register;