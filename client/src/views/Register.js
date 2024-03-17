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
        re_password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("You must enter your username!"),
        password: Yup.string().min(4).max(20).required("You must enter your password!"),
        re_password: Yup.string().min(4).max(20).required("You must enter your re-password!"),
    });

    const handleRegister = (data) => {
        if (data.password === data.re_password) {
            axios.post("http://localhost:3001/auth/register", data).then(() => {
                toast.success("Register success! You can login now!");
                navigator(`/login`);
            });
        }
        else {
            toast.error("Your password doesn't match!");
        }
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
                        type="password"
                        id="inputRegister"
                        name="password"
                        placeholder="(Password...)"
                    />
                    <ErrorMessage name="password" component="span"/>

                    <label>Re-password: </label>
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputRegister"
                        name="re_password"
                        placeholder="(Password...)"
                    />
                    <ErrorMessage name="re_password" component="span"/>

                    <button className="btn-register" type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    );
}


export default Register;