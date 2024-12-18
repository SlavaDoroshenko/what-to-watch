import { Link, useParams } from 'react-router-dom';
import { Form } from '../../components/form/form';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilm } from '../../store/api-action';
import { getFilm } from '../../store/films-data/selectors';
import { UserInfo } from '../../components/user-info/user-info';

export const AddReview = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const film = useAppSelector(getFilm);

  if (id && film) {
    if (Number(id) !== film.id) {
      dispatch(fetchFilm({ id }));
    }
  }

  if (!film) {
    return <div>Film not found</div>;
  }

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: `${film.backgroundColor}` }}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to={AppRoutes.Main} className="logo__link">
              <img src="img/logo.webp" alt="Logo" width="124" />
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">
                  {film.name}
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <UserInfo />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <Form />
      </div>
    </section>
  );
};
