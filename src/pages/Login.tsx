import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const goCreateChannel = () => {
        navigate('/create-channel');
    };

    return(
        <button onClick={goCreateChannel}>로그인하세요</button>
    );
}

export default Login;