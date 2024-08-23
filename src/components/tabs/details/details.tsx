import { Fragment } from 'react';
import { Film } from '../../../types/types';

type DetailsProps = {
  film: Film;
};

const getFilmDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};

export const Details = ({ film }: DetailsProps): JSX.Element => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{film.director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {film.starring.map((star, index) => (
            <Fragment key={star}>
              {star}
              {index !== film.starring.length - 1 && ', '}
              <br />
            </Fragment>
          ))}
        </span>
      </p>
    </div>
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{getFilmDuration(film.runTime)}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{film.genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{film.released}</span>
      </p>
    </div>
  </div>
);
