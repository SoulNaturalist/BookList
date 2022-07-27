import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function LoginForm () {
    const [User, setUser] = React.useState([]);
    const [Error,setError] = React.useState("");
    const navigate = useNavigate();
    React.useEffect(() => {
        axios('http://127.0.0.1:3030/api/auth',{method: 'post',mode:'no-cors',withCredentials: true})
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }, [])
    const resetErrorAlert = () => setError("");
    const msgError = (status) => {
        if (status === "Неверные данные!") {
            return "Неверные данные!"
        } else {
            return "Активируйте почту!"
        }
    }
    const errorAlert = () => {
        if (Boolean(Error)) {
            return <Alert variant="filled" severity="error">{msgError(Error)}</Alert>
        }
    }
    const CheckAuth = () => {
        if (User.auth_data) {
            return navigate(`/user/${User.auth_data.username}`)
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
                        <input type="submit" value="Вход" />
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
            if (response.data.user) {
                navigate(`/user/${response.data.user}`)
            } else {
                setError(response.data.message)
            }
        })
    }
    return (
        <div>
            {CheckAuth()}
            {errorAlert()}
        </div>
)}

export default LoginForm;
