import React from 'react';
import { useForm } from "react-hook-form";

function LoginForm () {
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type':'application/x-www-form-urlencoded' },
            mode: 'no-cors',
            body: {username: data.login,password: data.password}
        };
        fetch("http://127.0.0.1:3030/api/login",requestOptions)
        .then(res => {
            console.log(res)
        //   history.push('/');
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        })
      }
    return (
        <div>
            <div className="form_wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                    placeholder="Логин"
                    {...register("login", {
                    required: "Это обязательное поле",
                    })}
                    />
                    {errors.login && <p>{errors.login.message}</p>}
                    <input
                    placeholder="Пароль"
                    {...register("password", {
                    required: "Это обязательное поле"
                    })}
                    type="password"/>
                    {errors.password && <p>{errors.password.message}</p>}
                    <input type="submit" value="ок" />
                </form>
            </div>
        
        </div>
  
)}

export default LoginForm;
