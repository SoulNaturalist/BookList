import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm () {
    const [User, setUser] = React.useState([]);
    const [Error,setError] = React.useState(false);
    const navigate = useNavigate();
    React.useEffect(() => {
        axios('http://127.0.0.1:3030/api/auth',{method: 'post',mode:'no-cors',withCredentials: true})
        .then(res => {setUser(res.data)})
        .catch(err => {setError(err)})
    }, [])
    const CheckAuth = () => {
        if (User.auth_data) {
            return <div>
                <h1 style={{textAlign: 'center'}}>Добавление отзыва</h1>
            </div>
        } else {
            return navigate("/login");
        }

    }
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/login/',withCredentials: true, headers: {}, data: {username: data.login, password: data.password}})
        .then(response => {navigate('/profile')})
        .catch(error => {setError(error)})
    }
    return (
        <div>
            {CheckAuth()}
        </div>
)}

export default LoginForm;
