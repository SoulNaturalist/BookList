import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';
import {MainTitle, FormWrapper, InputWrapper, SaveButton} from "../styles/ChangeProfile.styles";

function ChangeProfile () {
    const navigate = useNavigate("/");
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()));
    const {register,getValues} = useForm();
    const profileSettingsComponent = () => {
        if (data.auth_data) {
            return (
                <div>
                    <MainTitle>Основное</MainTitle>
                    <FormWrapper>
                        <InputWrapper type="text"
                            placeholder="Статус"
                            defaultValue={data.auth_data.status}
                            {...register("status", {})}
                        />
                        <InputWrapper type="text"
                            placeholder="Аватар"
                            defaultValue={data.auth_data.avatar}
                            {...register("avatar", {})}
                        />
                        <InputWrapper type="text"
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