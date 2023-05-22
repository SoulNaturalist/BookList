import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { SuccessAlert, ErrorAlert, MainTitle, ResetButton, FormWrapper, Input } from '../styles/PasswordChange.styles';
import useSWR from 'swr';

function PasswordChange() {
  const [alertSuccessValue, setAlertSuccessValue] = React.useState(false);
  const [alertErrorValue, setAlertErrorValue] = React.useState(false);
  const navigate = useNavigate();

  const fetchAuthData = async () => {
    const response = await axios.post('http://127.0.0.1:3030/api/auth', { withCredentials: true });
    return response.data;
  };

  const { data: authData, error: authError } = useSWR('authData', fetchAuthData, { revalidateOnFocus: false });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:3030/api/confirm_change_password',
        {
          new_password: data.new_password,
          code: data.code
        },
        {
          withCredentials: true,
          headers: {}
        }
      );

      if (response.status === 200) {
        await axios.get('http://127.0.0.1:3030/api/logout', {
          withCredentials: true,
          headers: {}
        });
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitDefault = (data) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3030/api/change_passwd',
      withCredentials: true,
      headers: {},
      data: { password: data.password, new_password: data.new_password }
    })
      .then((response) => {
        if (response.status === 201) {
          setAlertSuccessValue(true);
        }
      })
      .catch((err) => {
        if (String(err) === 'Error: Request failed with status code 400') {
          setAlertErrorValue('Старый пароль не совпадает!');
        } else if (String(err) === 'Error: Request failed with status code 403') {
          setAlertErrorValue('Новый пароль совпадает с текущим!');
        }
      });
  };

  const { register, formState: { errors }, handleSubmit } = useForm({
    mode: 'onChange'
  });

  if (authError) {
    navigate('/login');
  }

  if (!authData) {
    return (
      <FormWrapper>
        <CircularProgress disableShrink />
      </FormWrapper>
    );
  }

  const { auth_data: userData } = authData;

  const onChangePassword = () => {
    setAlertErrorValue(false);
  };

  const PasswordChangeComponent = () => {
    if (userData && userData.twoAuth) {
      return (
        <div>
          <MainTitle>Безопасность аккаунта</MainTitle>
          <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.code && <p>{errors.code.message}</p>}
              <Input
                className="login"
                placeholder="Код"
                {...register('code', { required: 'Это обязательное поле' })}
              />
              {errors.new_password && <p>{errors.new_password.message}</p>}
              <Input
                className="password"
                placeholder="Новый пароль"
                {...register('new_password', { required: 'Это обязательное поле' })}
                type="password"
              />
              <Input type="submit" value="Сменить пароль" />
            </form>
          </FormWrapper>
        </div>
      );
    } else {
      return (
        <div>
          <MainTitle>Безопасность аккаунта</MainTitle>
          <FormWrapper>
            <form onSubmit={handleSubmit(onSubmitDefault)}>
              {errors.password && <p>{errors.password.message}</p>}
              <Input
                placeholder="Текущий пароль"
                type="password"
                {...register('password', { required: 'Это обязательное поле' })}
                onChange={onChangePassword}
              />
              {errors.new_password && <p>{errors.new_password.message}</p>}
              <Input
                placeholder="Новый пароль"
                {...register('new_password', { required: 'Это обязательное поле' })}
                type="password"
              />
              <ResetButton type="submit" value="Сменить пароль" />
            </form>
          </FormWrapper>
        </div>
      );
    }
  };

  const alert = () => {
    if (alertErrorValue) {
      return <ErrorAlert>{alertErrorValue}</ErrorAlert>;
    } else if (alertSuccessValue) {
      return <SuccessAlert variant="filled" severity="success">Пароль изменен!</SuccessAlert>;
    }
  };

  return (
    <div>
      {PasswordChangeComponent()}
      {alert()}
    </div>
  );
}

export default PasswordChange;