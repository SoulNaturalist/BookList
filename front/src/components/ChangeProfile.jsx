import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";

function ChangeProfile () {
    const [Data,setData] = React.useState("");
    const [Error,setError] = React.useState(false);
    const [Username, setUsername] = React.useState("");
    const navigate = useNavigate("/");
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {setData(response.data)})
        .catch(err => {setError(err)})
    }, [])
    const {register,handleSubmit} = useForm();
    const CheckAuth = () => {
        if (Data.auth_data) {
            return (
                <div>
                    <h2 className="title_main">Основное</h2>
                    <div className="form_wrapper">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input className="nicname_input"
                            placeholder="Никнейм"
                            defaultValue={Data.auth_data.username}
                            {...register("nicname", {})}
                            />
                            <input type="text" className="status_input"
                            placeholder="Статус"
                            defaultValue={Data.auth_data.status}
                            {...register("status", {})}
                            />
                            <input type="text" className="avatar_input"
                            placeholder="Аватар"
                            defaultValue={Data.auth_data.avatar}
                            {...register("avatar", {})}
                            />
                            <input className="save_button" type="submit" value="Сохранить" />
                        </form>
                    </div>
                </div>
        )

        } else {
            navigate("/login")
        }
    }
    const onSubmit = (data) => {
        if (data.nicname && data.status && data.avatar) {
            axios({method: 'put',url:'http://127.0.0.1:3030/api/setting_user/',withCredentials: true, headers: {}, data: 
            {username:data.nicname, status:data.status,avatar:data.avatar}})
            .then(response => {navigate('/profile')})
            .catch(error => {console.log(error)})
        }
    }
    return (
        <div>
            {CheckAuth()}
        </div>
  
)}
export default ChangeProfile;
