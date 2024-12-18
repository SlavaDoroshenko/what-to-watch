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
        <section className="film-card film-card--full" style={{ backgroundColor: `${film.backgroundColor}` }}>
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header film-card__head">
              <div className="logo">
                <Link to={AppRoutes.Main} className="logo__link">
                  <img src="img/logo.webp" alt="Logo" width="124" />
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
                <img src="img/logo.webp" alt="Logo" width="124" />
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
};
