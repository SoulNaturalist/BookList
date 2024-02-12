import React from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FormWrapper,
  FlexWrapper,
  Input,
  RegistrationButton,
} from "../styles/RegistrationForm.styles";

function RegistarationForm() {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [toFetch, setFetch] = React.useState(false);
  const { data } = useSWR("http://127.0.0.1:3030/api/auth", (apiURL) =>
    fetch(apiURL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json()),
  );
  const resetErrorAlert = () => setError(false);
  const msgError = () => {
    if (error === "Request failed with status code 422") {
      return "Почта или никнейм не уникальны!";
    }
    if (error === "Request failed with status code 400") {
      return "Ваша почта не входит в список разрешенных!";
    }
  };
  const registrationFormComponent = () => {
    if (data && data.auth_data) {
      return navigate(`/user/${data.auth_data.username}`);
    } else {
      return (
        <div>
          <FormWrapper>
            {errors.login && <p>{errors.login.message}</p>}
            <Input
              placeholder="Никнейм"
              {...register("login", { required: "Это обязательное поле" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              placeholder="Пароль"
              onChange={() => {
                resetErrorAlert();
              }}
              {...register("password", { required: "Это обязательное поле" })}
              type="password"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              placeholder="Почта"
              onChange={() => {
                resetErrorAlert();
              }}
              {...register("email", {
                required: "Это обязательное поле",
                min: 3,
                max: 15,
              })}
              type="email"
            />
            <RegistrationButton type="submit" onClick={() => setFetch(true)}>
              Регистрация
            </RegistrationButton>
          </FormWrapper>
        </div>
      );
    }
  };
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const dataForm = getValues();
  useSWR(!toFetch ? null : "http://127.0.0.1:3030/api/register", (apiURL) =>
    fetch(apiURL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: dataForm.login,
        password: dataForm.password,
        email: dataForm.email,
      }),
    })
      .then((res) => {
        res.json();
        navigate("/check_email");
      })
      .catch((err) => setError(err)),
  );
  return (
    <div>
      {data ? (
        registrationFormComponent()
      ) : (
        <FlexWrapper>
          <CircularProgress disableShrink />
        </FlexWrapper>
      )}
      {Boolean(error) ? (
        <Alert variant="filled" severity="error">
          {msgError(error)}
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
}

export default RegistarationForm;
