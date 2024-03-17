import React, {useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

function ChangePassword() {
    let navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const changePassword = () => {
        axios
        .put('http://localhost:3001/auth/changepassword', 
            {   
                oldPassword: oldPassword, 
                newPassword: newPassword
            },
            {
                headers: {accessToken: localStorage.getItem("accessToken")}
            }
        )
        .then((res) => {
            if (res.data.error) {
                toast.error(res.data.error);
            }
            else {
                toast.success(res.data.message);
                navigate('/');
            }
        });
    }

    return (
        <div>
            <h1>Change password</h1>
            <input type="text" placeholder="(Old password...)" onChange={(e) => {setOldPassword(e.target.value)}}/>
            <input type="text" placeholder="(New password...)" onChange={(e) => {setnewPassword(e.target.value)}}/>
            <button onClick={changePassword}>Save new password</button>
        </div>
    );
}

export default ChangePassword;


