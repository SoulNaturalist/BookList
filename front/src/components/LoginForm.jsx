import React from 'react';
import useSWR from 'swr';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import {FormWrapper, Input, LinkCreateAcc, LoginButton} from './styles/LoginForm.styles';

function LoginForm () {
    const [Error,setError] = React.useState("");
    const [toFetch,setFetch] = React.useState(false);
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
                <FormWrapper>
                    <form>
                        <Input
                        placeholder="Логин"
                        required
                        {...register("login", {})}
                        onChange={() => {resetErrorAlert()}}
                        />
                        {errors.login && <p>{errors.login.message}</p>}
                        <Input
                        placeholder="Пароль"
                        {...register("password", {})}
                        onChange={() => {resetErrorAlert()}}
                        type="password" required/>
                        {errors.password && <p>{errors.password.message}</p>}
                        <LinkCreateAcc href="http://127.0.0.1:3000/registration">Нет аккаунта</LinkCreateAcc>
                        <LoginButton type="button" onClick={() => setFetch(true)}>Вход</LoginButton>
                    </form>
                </FormWrapper>
            </div>
        }
    }
    const {register,getValues, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const dataForm = getValues()
    useSWR(!toFetch ? null :'http://127.0.0.1:3030/api/login/', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({username: dataForm.login, password: dataForm.password})
    }).then(res => {
        if (res.ok) {
            navigate("/user/" + dataForm.login)
        } else {
            setError("Неверные данные!")
        }
    }));
    return (
        <div>
            {LoginFormComponent()}
            {Boolean(Error) ? <Alert variant="filled" severity="error">{msgError(Error)}</Alert>:""}
        </div>
)}

export default LoginForm;