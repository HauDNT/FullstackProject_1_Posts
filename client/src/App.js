import './styles/App.scss';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/Home';
import CreatePost from './views/CreatePost';
import Post from './views/Post';
import Login from './views/Login';
import Register from './views/Register';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <div className="navbar">
                    <Link to="/">Home Page</Link>
                    <Link to="/createpost">Create a new post</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                <Routes>
                    <Route path='/' exact Component={Home}/>
                    <Route path='/createpost' exact Component={CreatePost}/>
                    <Route path='/post/:id' exact Component={Post}/>
                    <Route path='/login' exact Component={Login}/>
                    <Route path='/register' exact Component={Register}/>
                </Routes>
            </BrowserRouter>
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