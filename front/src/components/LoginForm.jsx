import axios from "axios";
import React from 'react';
import useSWR from 'swr';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function LoginForm () {
    const [Error,setError] = React.useState("");
    const navigate = useNavigate();
    const { dataUser } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()));
    const resetErrorAlert = () => setError("");
    const msgError = (status) => {
        if (status === "Неверные данные!") {
            return "Неверные данные!"
        } else if (status === "Ошибка сервера!") {
            return "Ошибка сервера!"
        } else {
            return "Активируйте почту!"
        }
    }
    const LoginFormComponent = () => {
        if (dataUser && dataUser.auth_data) {
            return navigate(`/user/${dataUser.auth_data.username}`)
        } else {
            return <div>
                <div className="form_wrapper">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className="login"
                        placeholder="Логин"
                        required
                        {...register("login", {})}
                        onChange={(e) => {resetErrorAlert()}}
                        />
                        {errors.login && <p>{errors.login.message}</p>}
                        <input className="password"
                        placeholder="Пароль"
                        {...register("password", {})}
                        onChange={(e) => {resetErrorAlert()}}
                        type="password" required/>
                        {errors.password && <p>{errors.password.message}</p>}
                        <a href="http://127.0.0.1:3000/registration" className="registration_link">Нет аккаунта</a>
                        <input type="submit" value="Вход"/>
                    </form>
                </div>
            </div>
        }
    }
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/login/',withCredentials: true, headers: {}, data: {username: data.login, password: data.password}})
        .then(response => {
            if (response && response.data) {
                navigate(`/user/${response.data.user}`)
            } else {
                setError("Ошибка сервера!")
            }
        })
    }
    return (
        <div>
            {LoginFormComponent()}
            {Boolean(Error) ? <Alert variant="filled" severity="error">{msgError(Error)}</Alert>:""}
        </div>
)}

export default LoginForm;
