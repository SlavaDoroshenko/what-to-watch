import { Link } from 'react-router-dom';
import FilmsList from '../../components/film-list/film-list';
import { UserInfo } from '../../components/user-info/user-info';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoritesFilms, getIsDataLoaded } from '../../store/films-data/selectors';
import { Film } from '../../types/types';
import { AppRoutes } from '../../const';
import { useEffect } from 'react';
import { checkLoginAction, fetchIsFavorite } from '../../store/api-action';
import { Spinner } from '../../components/spinner/spinner';

export const MyList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const films: Film[] = useAppSelector(getFavoritesFilms);
  const isLoading = useAppSelector(getIsDataLoaded);

  useEffect(() => {
    dispatch(fetchIsFavorite());
  }, [dispatch]);

  useEffect(
    () => () => {
      dispatch(checkLoginAction());
    },
    [dispatch]
  );

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoutes.Main} className="logo__link">
              <img src="img/logo.webp" alt="Logo" width="124" />
            </Link>
          </div>
          <h1 className="page-title user-page__title">My list</h1>
          <UserInfo />
        </header>
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmsList films={films} />
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <img src="img/logo.webp" alt="Logo" width="124" />
            </a>
          </div>
        </footer>
      </div>
    );
  }
};
