import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  MainTitle,
  FormWrapper,
  InputWrapper,
  SaveButton,
} from "../styles/ChangeProfile.styles";
import { Alert } from "@mui/material";
import UseTitle from "../../hooks/UseTitle.js";
import axios from "axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function ProfileChangeMenu() {
    const navigate = useNavigate();
    const { data, isLoading } = useSWR(
      "http://127.0.0.1:3030/api/auth",
      (apiURL) =>
        fetch(apiURL, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }).then((res) => res.json()),
    );
    const { register, getValues } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
  
    const profileSettingsComponent = () => {
      if (data && data.auth_data) {
        return (
          <div>
            <UseTitle title="Редактировать профиль"></UseTitle>
            <MainTitle>Основное</MainTitle>
            <FormWrapper>
              <InputWrapper
                type="text"
                placeholder="Статус"
                defaultValue={data.auth_data.status}
                {...register("status", {})}
              />
              <InputWrapper
                type="text"
                placeholder="Аватар"
                defaultValue={data.auth_data.avatar}
                {...register("avatar", {})}
              />
              <InputWrapper
                type="text"
                placeholder="Изображение описания"
                defaultValue={data.auth_data.bg}
                {...register("bg", {})}
              />
              <SaveButton type="submit" onClick={onSubmit}>
                Сохранить
              </SaveButton>
            </FormWrapper>
          </div>
        );
      } else if (!isLoading && !isSubmitting) {
        navigate("/login");
      }
    };
  
    const onSubmit = () => {
      const dataSubmit = getValues();
      if (dataSubmit.status || dataSubmit.avatar || dataSubmit.bg) {
        const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w.-]*)*\/?$/i;
        if (!urlRegex.test(dataSubmit.avatar)) {
          setIsSubmitting(true);
          setError("Ошибка: указанная аватарка не подходит");
        } else {
          setIsSubmitting(true);
          axios
            .put(
              "http://127.0.0.1:3030/api/setting_user/",
              {
                status: dataSubmit.status,
                avatar: dataSubmit.avatar,
                bg: dataSubmit.bg,
              },
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              },
            )
            .then(() => {
              navigate(`/user/${data.auth_data.username}?update=true`);
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                navigate("/login");
              } else if (error.response && error.response.status === 400) {
                setError("Ошибка: указанная аватарка не подходит");
              } else {
                console.log(error);
              }
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        }
      }
    };
  
    return (
      <div>
        {data ? (
          profileSettingsComponent()
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: "350px",
            }}
          >
            <CircularProgress disableShrink />
          </div>
        )}
        {error && (
          <Alert
            variant="outlined"
            severity="error"
            onClose={() => setError(null)}
            style={{ position: "relative", top: "-35px" }}
          >
            {error}
          </Alert>
        )}
      </div>
    );
  }