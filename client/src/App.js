import './styles/App.scss';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/Home';
import CreatePost from './views/CreatePost';
import Post from './views/Post';
import Login from './views/Login';
import Register from './views/Register';
import {AuthContext} from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [authState, setAuthState] = useState(false);
    
    // Dùng useEffrect và useState để kiểm soát token, phòng chống sử dụng Token giả để login:
    useEffect(() => {
        axios.get('http://localhost:3001/auth/auth', {headers: {accessToken: localStorage.getItem('accessToken')}}).then((res) => {
            if (res.data.error) setAuthState(false);
            else setAuthState(true);
        });
    }, []);

    return (
        <div className='App'>

        {/* Bọc toàn bộ ReactJS App với Auth Context để kiểm soát trạng thái ứng dụng */}
        {/* AuthContext hay các Context đều phải được đưa ra cấp cao nhất (App.js) */}
        <AuthContext.Provider value={{authState, setAuthState}}>
            <BrowserRouter>
                <div className="navbar">
                    <Link to="/">Home Page</Link>
                    <Link to="/createpost">Create a new post</Link>

                    {/* Nếu chưa có authState (chưa login) thì hiển thị nút đăng ký/nhập */}
                    {!authState && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
                <Routes>
                    <Route path='/' exact Component={Home}/>
                    <Route path='/createpost' exact Component={CreatePost}/>
                    <Route path='/post/:id' exact Component={Post}/>
                    <Route path='/login' exact Component={Login}/>
                    <Route path='/register' exact Component={Register}/>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        </div>
    );
}

export default App;