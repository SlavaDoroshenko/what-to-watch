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
      <div className="visually-hidden">
        {/* inject:svg */}
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <symbol id="add" viewBox="0 0 19 20">
            {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
              <polygon
                id="+"
                fill="#EEE5B5"
                points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"
              />
            </g>
          </symbol>
          <symbol id="full-screen" viewBox="0 0 27 27">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z"
              fill="#FFF9D9"
              fillOpacity="0.7"
            />
          </symbol>
          <symbol id="in-list" viewBox="0 0 18 14">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z"
              fill="#EEE5B5"
            />
          </symbol>
          <symbol id="pause" viewBox="0 0 14 21">
            <symbol id="play-s" viewBox="0 0 19 19">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" />
            </symbol>
            {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
              <polygon
                id="Line"
                fill="#EEE5B5"
                fillRule="nonzero"
                points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"
              />
              <polygon
                id="Line"
                fill="#EEE5B5"
                fillRule="nonzero"
                points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"
              />
            </g>
          </symbol>
        </svg>
        {/* endinject */}
      </div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo.backgroundImage} alt={promo.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <div className="logo">
            <div className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
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
                <Link className="btn btn--play film-card__button" to={`${AppRoutes.Player}/${promo.id}`}>
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
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
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};
