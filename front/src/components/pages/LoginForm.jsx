import React from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {
  FormWrapper,
  Input,
  LinkCreateAcc,
  LoginButton,
} from '../styles/LoginForm.styles';

function LoginForm() {
  const [error, setError] = React.useState('');
  const [toFetch, setFetch] = React.useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async (dataForm) => {
    try {
      const response = await fetch('http://127.0.0.1:3030/api/login/', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: dataForm.login,
          password: dataForm.password,
        }),
      });

      if (response.ok) {
        navigate(`/user/${dataForm.login}`);
      } else {
        setError('Неверные данные!');
      }
    } catch (error) {
      setError('Ошибка сервера!');
    }
  };

  const resetErrorAlert = () => setError('');

  const msgError = (status) => {
    if (status === 'Неверные данные!') {
      return 'Неверные данные!';
    } else if (status === 'Ошибка сервера!') {
      return 'Ошибка сервера!';
    } else {
      return 'Активируйте почту!';
    }
  };

  const { data: dataUser } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then((res) => res.json()));

  return (
    <div>
      {dataUser && dataUser.auth_data ? (
        navigate(`/user/${dataUser.auth_data.username}`)
      ) : (
        <div>
          <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Логин"
                required
                {...register('login', {})}
                onChange={resetErrorAlert}
              />
              {errors.login && <p>{errors.login.message}</p>}
              <Input
                placeholder="Пароль"
                {...register('password', {})}
                onChange={resetErrorAlert}
                type="password"
                required
              />
              {errors.password && <p>{errors.password.message}</p>}
              <LinkCreateAcc href="http://127.0.0.1:3000/registration">
                Нет аккаунта
              </LinkCreateAcc>
              <LoginButton type="submit">
                Вход
              </LoginButton>
            </form>
          </FormWrapper>
        </div>
      )}
      {Boolean(error) && (
        <Alert variant="filled" severity="error">
          {msgError(error)}
        </Alert>
      )}
    </div>
  );
}

export default LoginForm;
