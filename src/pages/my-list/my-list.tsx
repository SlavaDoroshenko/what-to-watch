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
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <Link to={AppRoutes.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
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
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>
            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
};
