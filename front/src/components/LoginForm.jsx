import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm () {
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/login/',withCredentials: true, headers: {}, data: {email: data.login, password: data.password}})
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)})
        navigate('/');
    }
    return (
        <div>
            <h2 className="auth_title">Авторизация</h2>
            <div className="form_wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="login"
                    placeholder="Логин"
                    required
                    {...register("login", {})}
                    />
                    {errors.login && <p>{errors.login.message}</p>}
                    <input className="password"
                    placeholder="Пароль"
                    {...register("password", {})}
                    type="password" required/>
                    {errors.password && <p>{errors.password.message}</p>}
                    <input type="submit" value="Вход" />
                </form>
            </div>
        
        </div>
  
)}

export default LoginForm;