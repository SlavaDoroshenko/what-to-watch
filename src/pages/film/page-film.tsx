import { Link, useParams } from 'react-router-dom';
import { AppRoutes, AuthenticationStatus } from '../../const';
import { Tabs } from '../../components/tabs/tabs';
import { MoreLikeThis } from '../../components/more-like-this/more-like-this';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchComments, fetchFilm, putIsFavorite } from '../../store/api-action';
import { useEffect, useState } from 'react';
import { getFilm, getIsDataLoaded } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { MyListButton } from '../../components/my-list-button/my-list-button';
import { UserInfo } from '../../components/user-info/user-info';
import { Spinner } from '../../components/spinner/spinner';

export const PageFilm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getIsDataLoaded);

  const authStatus = useAppSelector(getAuthorizationStatus);

  const [isFavorite, setIsFavorite] = useState(film?.isFavorite);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetching = () => {
      if (id) {
        dispatch(fetchFilm({ id }));
        dispatch(fetchComments({ id }));
      }
    };

    if (!film || film.id.toString() !== id) {
      fetching();
    } else {
      setIsFavorite(film.isFavorite);
    }
  }, [film, id, dispatch]);

  useEffect(
    () => () => {
      if (id && isUpdate) {
        dispatch(fetchFilm({ id }));
        setIsUpdate(false);
      }
    },
    [id, isUpdate, dispatch]
  );

  const handleMyListButtonClick = () => {
    if (film) {
      const newStatus = !isFavorite;
      setIsFavorite(newStatus);
      setIsUpdate(true);
      dispatch(putIsFavorite({ filmId: film.id.toString(), status: newStatus ? 1 : 0 }));
    }
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    if (!film) {
      return <div>Film not found</div>;
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
        <section className="film-card film-card--full" style={{ backgroundColor: `${film.backgroundColor}` }}>
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header film-card__head">
              <div className="logo">
                <Link to={AppRoutes.Main} className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>
              <UserInfo />
            </header>
            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>
                <div className="film-card__buttons">
                  <Link className="btn btn--play film-card__button" to={`${AppRoutes.Player}/${film.id}`}>
                    <svg viewBox="0 0 19 19" width={19} height={19}>
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </Link>
                  {authStatus === AuthenticationStatus.Auth && (
                    <>
                      <MyListButton isFavorite={isFavorite || false} onClick={handleMyListButtonClick} />
                      <Link className="btn film-card__button" to={`${AppRoutes.AddReview}/${film.id}/review`}>
                        Add review
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />
              </div>
              <Tabs />
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <MoreLikeThis curFilm={film} />
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
