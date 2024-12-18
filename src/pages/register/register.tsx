import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { registerAction } from '../../store/api-action';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { RegData } from '../../types/register-data';
// import { useNavigate } from 'react-router-dom';
// import { AppRoutes } from '../../const';

export const Register = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const onSubmit = (regData: RegData) => {
    dispatch(registerAction(regData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null && usernameRef.current !== null) {
      onSubmit({
        name: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <div className="logo__link">
            <img src="img/logo.webp" alt="Logo" width="124" />
          </div>
        </div>
        <h1 className="page-title user-page__title">Зарегестрироваться</h1>
      </header>
      <div className="sign-in user-page__content">
        <form className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                placeholder="Имя"
                name="user-name"
                id="user-name"
                ref={usernameRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-name">
                Имя
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Почта"
                name="user-email"
                id="user-email"
                ref={emailRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">
                Почта
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Пароль"
                name="user-password"
                id="user-password"
                ref={passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">
                Пароль
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Зарегестрироваться
            </button>
          </div>
          <div className="sign-up__submit">
            <Link to={`${AppRoutes.Login}`} className="sign-up__btn">
              Войти
            </Link>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <div className="logo">
          <div className="logo__link logo__link--light">
            <img src="img/logo.webp" alt="Logo" width="124" />
          </div>
        </div>
      </footer>
    </div>
  );
};
