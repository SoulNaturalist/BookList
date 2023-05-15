import React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {SuccessAlert, ErrorAlert, MainTitle, ResetButton, FormWrapper, Input} from "./styles/PasswordChange.styles";


function PasswordChange () {
    const [user, setUser] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [alertSuccessValue, setAlertValue] = React.useState(false);
    const [alertErrorValue, setErrorValue] = React.useState(false);
    const navigate = useNavigate("/");

    React.useEffect(() => {
        axios({method: 'post',url:`http://127.0.0.1:3030/api/auth`,withCredentials: true, headers: {}})
        .then(response => {
            setUser(response.data);
            setLoading(false);
            if (response.data.auth_data.twoAuth) {
                axios({method: 'post',url:`http://127.0.0.1:3030/api/change_passwd`,withCredentials: true, headers: {}});
            }
        })
        .catch(error => {
            navigate("/login")
        })
    }, [])
    const onChangePassword = () => {
        setErrorValue(false);

    }
    const PasswordChangeComponent = () => {
        if (user["auth_data"]) {
            if (user["auth_data"]["twoAuth"]) {
                return <div>
                        <MainTitle>Безопасность аккаунта</MainTitle>
                        <FormWrapper>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {errors.login && <p>{errors.login.message}</p>}
                                <Input className="login"
                                    placeholder="Код"
                                    {...register("code", {required: "Это обязательное поле"})}
                                />
                                {errors.password && <p>{errors.password.message}</p>}
                                <Input className="password"
                                    placeholder="Новый пароль"
                                    {...register("new_password", {required: "Это обязательное поле"})}
                                    type="password"/>
                                    {errors.email && <p>{errors.email.message}</p>}
                                <Input type="submit" value="Сменить пароль" />
                            </form>
                        </FormWrapper>
                    </div>
            } else {
                return <div>
                        <MainTitle>Безопасность аккаунта</MainTitle>
                        <FormWrapper>
                            <form onSubmit={handleSubmit(onSubmitDefault)}>
                                {errors.password && <p>{errors.password.message}</p>}
                                <Input
                                    placeholder="Текущий пароль"
                                    type="password"
                                    {...register("password", {required: "Это обязательное поле"})}
                                    onChange={(e) => onChangePassword()}
                                />
                                {errors.new_password && <p>{errors.new_password.message}</p>}
                                <Input
                                    placeholder="Новый пароль"
                                    {...register("new_password", {required: "Это обязательное поле"})}
                                    type="password"/>
                                <ResetButton type="submit" value="Сменить пароль" />
                            </form>
                        </FormWrapper>
                    </div>
            }
        }
    }
    const {register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        axios({method: 'post',url:`http://127.0.0.1:3030/api/confirm_change_password`,withCredentials: true, headers: {}, data:{new_password:data.new_password, code:data.code}})
        .then(response => {
            if (response.status === 200) {
                axios({method: 'get',url:`http://127.0.0.1:3030/api/logout`,withCredentials: true, headers: {}});
                navigate("/login");
            }
        })
    }
    const alert = () => {
        if (alertErrorValue) {
            return <ErrorAlert>{alertErrorValue}</ErrorAlert>
        } else if (alertSuccessValue) {
            return <SuccessAlert variant="filled" severity="success">Пароль изменен!</SuccessAlert>
        }
    }

    const onSubmitDefault = (data) => {
        axios({method: 'post',url:`http://127.0.0.1:3030/api/change_passwd`,withCredentials: true, headers: {}, data:{password:data.password, new_password:data.new_password}})
        .then(response => {
            if (response.status === 201) {
                setAlertValue(true);
            }
        })
        .catch(err => {
            if (String(err) === "Error: Request failed with status code 400") {
                setErrorValue("Старый пароль не совпадает!");
            } else if (String(err) === "Error: Request failed with status code 403") {
                setErrorValue("Новый пароль сопадает с текущим!");
            }
        })
    }

    return loading ? <FormWrapper><CircularProgress disableShrink /></FormWrapper>:<div>
        {PasswordChangeComponent()}
        {alert()}
    </div>
}

export default PasswordChange;