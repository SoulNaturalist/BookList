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
            return navigate("/profile")
        } else {
            return <div>
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
        }

    }
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/login/',withCredentials: true, headers: {}, data: {email: data.login, password: data.password}})
        .then(response => {navigate('/profile')})
        .catch(error => {console.log(error)})
    }
    return (
        <div>
            {CheckAuth()}
        </div>
)}

export default LoginForm;
