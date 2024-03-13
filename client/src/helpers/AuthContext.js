// Tạo Context để quản lý trạng thái của ứng dụng. 
// Ở đây tạo AuthContext để quản lý Token khi người dùng đăng nhập vào.
import {createContext} from 'react';

export const AuthContext = createContext("");