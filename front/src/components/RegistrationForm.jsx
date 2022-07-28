import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function RegistarationForm () {
    const [User, setUser] = React.useState([]);
    const [Error,setError] = React.useState("");
    const [ErrorSubmit,setErrorSubmit] = React.useState("");
    const navigate = useNavigate();
    React.useEffect(() => {
        axios('http://127.0.0.1:3030/api/auth',{method: 'post',mode:'no-cors',withCredentials: true})
        .then(res => {setUser(res.data)})
        .catch(err => {setError(err)})
    }, [])
    const registrationFormComponent = () => {
        if (User.auth_data) {
            return navigate(`/user/${User.auth_data.username}`)
        } else {
            return <div>
                <div className="form_wrapper">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errors.login && <p>{errors.login.message}</p>}
                        <input className="login"
                        placeholder="Никнейм"
                        {...register("login", {required: "Это обязательное поле",
                        minLength: {value: 2,message: "Нужен более длинный никнейм"},
                        maxLength: {value: 15,message: "Нужен более короткий никнейм"}
                        })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        <input className="password"
                        placeholder="Пароль"
                        {...register("password", {required: "Это обязательное поле"})}
                        type="password"/>
                        {errors.email && <p>{errors.email.message}</p>}
                        <input className="email"
                        placeholder="Почта"
                        {...register("email", {required: "Это обязательное поле",min:3,max:15,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
                        type="email"/>
                        <input type="submit" value="Регистрация" />
                    </form>
                </div>
            </div>
        }

    }
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/register',withCredentials: true, headers: {}, data: {username: data.login, password: data.password, email:data.email}})
        .then(response => {navigate('/check_email')})
        .catch(error => {setErrorSubmit(error)})
    }
    return (
        <div>
            {registrationFormComponent()}
        </div>
)}

export default RegistarationForm;
