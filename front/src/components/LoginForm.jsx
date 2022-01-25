import React from 'react';
import { useForm } from "react-hook-form";

function LoginForm () {
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const onSubmit = async (data) => {
        const object = { username: data.login,password:data.password };
        const request = new Request('http://127.0.0.1:3030/api/login', {
            method: 'POST',
            body: JSON.stringify(object),
            credentials: "include",
            mode:'no-cors',
            headers: {'Content-Type': 'text/json'}
        });
        const response = await fetch(request);
        console.log(response);
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
