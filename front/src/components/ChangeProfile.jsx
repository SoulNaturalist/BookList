import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';

function ChangeProfile () {
    const navigate = useNavigate("/");
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{method: "post",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: 'include'
    }).then(res => res.json()));
    const {register,handleSubmit} = useForm();
    const profileSettingsComponent = () => {
        if (data.auth_data) {
            return (
                <div>
                    <h2 className="title_main">Основное</h2>
                    <div className="form_wrapper">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="status_input"
                            placeholder="Статус"
                            defaultValue={data.auth_data.status}
                            {...register("status", {})}
                            />
                            <input type="text" className="avatar_input"
                            placeholder="Аватар"
                            defaultValue={data.auth_data.avatar}
                            {...register("avatar", {})}
                            />
                            <input type="text" className="bg_url"
                            placeholder="Изображение описания"
                            defaultValue={data.auth_data.bg}
                            {...register("bg", {})}
                            />
                            <input className="save_button" type="submit" value="Сохранить" />
                        </form>
                        <a href="http://127.0.0.1:3000/change_password"><p className="reset_password">Забыл пароль</p></a>
                    </div>
                </div>
        )

        } else {
            navigate("/login")
        }
    }
    const onSubmit = (dataSubmut) => {
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
