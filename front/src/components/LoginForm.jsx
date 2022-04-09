import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function LoginForm () {
    const [User, setUser] = React.useState([]);
    const [Error,setError] = React.useState("");
    const [ErrorSubmit,setErrorSubmit] = React.useState("");
    const navigate = useNavigate();
    React.useEffect(() => {
        axios('http://127.0.0.1:3030/api/auth',{method: 'post',mode:'no-cors',withCredentials: true})
        .then(res => {setUser(res.data)})
        .catch(err => {setError(err)})
    }, [])
    const errorAlert = () => {
        if (ErrorSubmit) {
            return <Alert variant="filled" severity="error">Проверьте правильность введенных данных</Alert>
        }
    }
    const CheckAuth = () => {
        if (User.auth_data) {
            return navigate("/profile")
        } else {
            return <div>
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
        axios({method: 'post',url:'http://127.0.0.1:3030/api/login/',withCredentials: true, headers: {}, data: {username: data.login, password: data.password}})
        .then(response => {navigate('/profile')})
        .catch(error => {setErrorSubmit(error)})
    }
    return (
        <div>
            {CheckAuth()}
            {errorAlert()}
        </div>
)}

export default LoginForm;
