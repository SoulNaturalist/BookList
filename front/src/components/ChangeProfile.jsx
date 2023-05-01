import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import styled, { keyframes } from "styled-components";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';

function ChangeProfile () {
    const navigate = useNavigate("/");
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()));
    const {register,getValues} = useForm();
    const MainTitle = styled.h2`
    font-family: 'Manrope', sans-serif;
    text-align: center;
    position:relative;
    top:160px;
    `
    const FormWrapper = styled.div`
    padding: 50px;
    position: fixed; top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    `
    const InputWrapper = styled.input`
    background-color: #000; 
    display: block;
    box-sizing: border-box;
    padding:20px;
    width:300px;
    margin-bottom:20px;
    font-size:18px;
    outline:none;
    border-radius:10px;
    color: #ffffff;
    font-family: 'Manrope', sans-serif;
    `
    const buttonClickAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
    `;
    const SaveButton = styled.button`
    color:#000;
    background-color:#ffb54d;
    display: block;
    font-size:18px;
    outline:none;
    width:140px;
    height:70px;
    margin:0 auto;
    cursor:pointer;
    font-family: 'Manrope', sans-serif;
    border:none;
    &:hover {
        background-color:#ff9f00;
    }
    &:active {
        animation: ${buttonClickAnimation} 0.2s ease-in-out;
    }
    `
    const profileSettingsComponent = () => {
        if (data.auth_data) {
            return (
                <div>
                    <MainTitle>Основное</MainTitle>
                    <FormWrapper>
                        <InputWrapper type="text" className="status_input"
                            placeholder="Статус"
                            defaultValue={data.auth_data.status}
                            {...register("status", {})}
                        />
                        <InputWrapper type="text" className="avatar_input"
                            placeholder="Аватар"
                            defaultValue={data.auth_data.avatar}
                            {...register("avatar", {})}
                        />
                        <InputWrapper type="text" className="bg_url"
                            placeholder="Изображение описания"
                            defaultValue={data.auth_data.bg}
                            {...register("bg", {})}
                        />
                        <SaveButton type="submit" onClick={() => onSubmit()}>Сохранить</SaveButton>
                    </FormWrapper>
                </div>
        )

        } else {
            navigate("/login")
        }
    }
    const onSubmit = () => {
        const dataSubmut = getValues();
        if (dataSubmut.status || dataSubmut.avatar || dataSubmut.bg) {
            axios({method: 'put',url:'http://127.0.0.1:3030/api/setting_user/',withCredentials: true, headers: {}, data: 
            {status:dataSubmut.status,avatar:dataSubmut.avatar,bg:dataSubmut.bg}})
            .then(() => {navigate(`/user/${data.auth_data.username}`)})
            .catch(error => {console.log(error)})
        }
    }
    return (
        <div>
            {data ? profileSettingsComponent():<div style={{display: 'flex', justifyContent: 'center', position:'relative',top:'350px'}}><CircularProgress disableShrink /></div>}
        </div>
  
)}
export default ChangeProfile;
