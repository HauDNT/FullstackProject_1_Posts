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
import PageNotFound from './views/PageNotFound';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [authState, setAuthState] = useState({
        username: "", 
        id: 0, 
        status: false
    });
    
    // Dùng useEffrect và useState để kiểm soát token, phòng chống sử dụng Token giả để login:
    useEffect(() => {
        axios
            .get('http://localhost:3001/auth/auth', {headers: {accessToken: localStorage.getItem('accessToken')}})
            .then((res) => {
                // Nếu đăng nhập không thành công thì lấy lại giá trị mặc định của authState và
                // gán thuộc tính status = false
                if (res.data.error) setAuthState({...authState, status: false});    

                // Nếu đăng nhập thành công thì gán thuộc tính tương ứng:
                else setAuthState({       
                    username: res.data.username, 
                    id: res.data.id, 
                    status: true,
                });
            });
    }, []);

    // Logout event:
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({  username: "", 
                        id: 0, 
                        status: false});
    };

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
                    {!authState.status ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            <button onClick={handleLogout}>Logout</button>
                            {/* <Link to="/logout">Logout</Link> */}
                        </>
                    )}

                    <h3>{authState.username}</h3>
                </div>
                <Routes>
                    <Route path='/' exact Component={Home}/>
                    <Route path='/createpost' exact Component={CreatePost}/>
                    <Route path='/post/:id' exact Component={Post}/>
                    <Route path='/login' exact Component={Login}/>
                    <Route path='/register' exact Component={Register}/>
                    <Route path='*' exact Component={PageNotFound}/>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>

        <ToastContainer
            position="top-center"
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