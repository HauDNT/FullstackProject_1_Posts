import React from "react";
import axios from "axios";
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import '../styles/Register.scss';

function Login() {
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("You must enter your username!"),
        password: Yup.string().min(4).max(20).required("You must enter your password!"),
    });

    const handleLogin = (data) => {
        axios.post("http://localhost:3001/auth/login", data).then((res) => {
            if (res.data.error) 
                alert(res.data.error);
            else
                sessionStorage.setItem("accessToken", res.data);   
                // Get token int json data from server and send to sessionStorage in client
        });
    };

    return (
        <div className="registerPage">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                {({
                    handleChange,
                    values,
                }) => (
                    <Form className="registerContainer">
                        <label>Username: </label>
                        <Field
                            autoComplete="off"
                            id="inputRegister"
                            name="username"
                            placeholder="(Username...)"
                            onChange={handleChange}
                            value = {values.username}
                        />
                        <ErrorMessage name="username" component="span"/>

                        <label>Password: </label>
                        <Field
                            autoComplete="off"
                            type="password"
                            id="inputRegister"
                            name="password"
                            placeholder="(Password...)"
                            onChange={handleChange}
                            value = {values.password}
                        />
                        <ErrorMessage name="password" component="span"/>

                        <button className="btn-register" type="submit">Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;