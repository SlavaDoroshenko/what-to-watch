/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import FilmsList from '../../components/film-list/film-list';
import { Film } from '../../types/types';
import { AppRoutes, AuthenticationStatus } from '../../const';
import { GenresList } from '../../components/genres-list/genres-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ShowMore } from '../../components/show-more/show-more';
import {
  filterFilm,
  getIsDataLoaded,
  getNumberOfFilms,
  getPromoFilm,
} from '../../store/films-data/selectors';
import { Spinner } from '../../components/spinner/spinner';
import { UserInfo } from '../../components/user-info/user-info';
import { useEffect, useState } from 'react';
import { setGenre } from '../../store/films-data/films-data';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { MyListButton } from '../../components/my-list-button/my-list-button';
import { fetchPromo, putIsFavorite } from '../../store/api-action';

export const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const numberOfFilms: number = useAppSelector(getNumberOfFilms);
  const films: Film[] = useAppSelector(filterFilm);
  const promo: Film | null = useAppSelector(getPromoFilm);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isLoading = useAppSelector(getIsDataLoaded);

  const [isFavorite, setIsFavorite] = useState(promo?.isFavorite);

  useEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  useEffect(() => {
    if (promo) {
      setIsFavorite(promo.isFavorite);
    }
    const genre = 'All genres';
    return () => {
      dispatch(setGenre(genre));
    };
  }, [promo, dispatch]);

  const handleMyListButtonClick = () => {
    if (promo) {
      const newStatus = !isFavorite;
      setIsFavorite(newStatus);
      dispatch(putIsFavorite({ filmId: promo.id.toString(), status: newStatus ? 1 : 0 }));
    }
  };

  if (!promo || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo.backgroundImage} alt={promo.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <div className="logo">
            <div className="logo__link">
              <img src="/img/logo.webp" alt="Logo" width="124" />
            </div>
          </div>
          <UserInfo />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo.posterImage} alt={`${promo.name} poster`} width={218} height={327} />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo.genre}</span>
                <span className="film-card__year">{promo.released}</span>
              </p>
              <div className="film-card__buttons">
                {authStatus === AuthenticationStatus.Auth && (
                  <MyListButton isFavorite={isFavorite || false} onClick={handleMyListButtonClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          {(() => {
            if (films.length > 0) {
              return <FilmsList films={films.slice(0, numberOfFilms)} />;
            } else {
              return <p>Фильмы не найдены</p>;
            }
          })()}
          <ShowMore filmsLength={films.length} />
        </section>
        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to={AppRoutes.Main}>
              <img src="img/logo.webp" alt="Logo" width="124" />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};
