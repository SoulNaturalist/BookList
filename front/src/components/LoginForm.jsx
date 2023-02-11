import React from 'react';
import useSWR from 'swr';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Alert from '@mui/material/Alert';

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
    const FormWrapper = styled.div`
    padding: 50px;
    position: fixed; top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    `
    const LoginButton = styled.button`
    display:block;
    margin:auto;
    position:relative;
    top:10px;
    appearance: none;
    background: rgb(0, 0, 0);
    color: white;
    border: none;
    padding: 15px 20px;
    border-radius: 4px;
    -webkit-appearance: none;
    color: white;
    font-size: 16px;
    cursor:pointer;
    `
    const Input = styled.input`
    color:white;
    background-color: #000; 
    display: block;
    box-sizing: border-box;
    padding:20px;
    width:300px;
    margin-bottom:20px;
    font-size:18px;
    outline:none;
    border-radius:10px;
    `
    const LinkCreateAcc = styled.a`
    font-family: 'Manrope', sans-serif;
    position:relative;
    left:10px;
    top:-3px;
    `
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
                        <LoginButton type="submit" onClick={() => setFetch(true)}>Вход</LoginButton>
                    </form>
                </FormWrapper>
            </div>
        }
    }
    const {register,getValues, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const dataForm = getValues()
    const { loginData } = useSWR(!toFetch ? null :'http://127.0.0.1:3030/api/login/', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
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