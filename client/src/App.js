import './styles/App.scss';
import Home from './views/Home';
import CreatePost from './views/CreatePost';
import Post from './views/Post';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Link to="/createpost">Create a new post</Link>
                <br />
                <Link to="/">Home Page</Link>
                <Routes>
                    <Route path='/' exact Component={Home}/>
                    <Route path='/createpost' exact Component={CreatePost}/>
                    <Route path='/post/:id' exact Component={Post}/>
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