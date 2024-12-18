import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, FilmData, State } from '../types/state';
import { APIRoute, AppRoutes } from '../const';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import { removeToken, setToken } from '../services/token';
import { UserData } from '../types/user-data';
import { Film, Comment } from '../types/types';
import { CommentData } from '../types/comment-data';
import { setUserInfo } from './user-process/user-process';
import { RegData } from '../types/register-data';

export const fetchFilms = createAsyncThunk<
  Film[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Film[]>(APIRoute.Films);
  return data;
});

export const fetchFilm = createAsyncThunk<
  Film,
  { id: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilm', async ({ id }, { dispatch, extra: api }) => {
  const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
  return data;
});

export const fetchPromo = createAsyncThunk<
  Film,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromo', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Film>(APIRoute.Promo);
  return data;
});

export const fetchComments = createAsyncThunk<
  Comment[],
  { id: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async ({ id }, { dispatch, extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const fetchIsFavorite = createAsyncThunk<
  Film[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchIsFavorite', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Film[]>(APIRoute.Favorite);
  return data;
});

export const putComments = createAsyncThunk<
  void,
  { filmId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/putComments', async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
  await api.post<CommentData>(`${APIRoute.Comments}/${filmId}`, { comment, rating });
});

export const putIsFavorite = createAsyncThunk<
  void,
  { filmId: string; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/putIsFavorite', async ({ filmId, status }, { dispatch, extra: api }) => {
  if (!filmId) {
    throw new Error('Film ID is required');
  }
  await api.post<FilmData>(`${APIRoute.Favorite}/${filmId}/${status}`);
});
export const checkLoginAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkLogin', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  dispatch(setUserInfo({ avatarUrl: data.avatarUrl, name: data.name }));
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
  setToken(data.token);
  dispatch(setUserInfo({ avatarUrl: data.avatarUrl, name: data.name }));
  dispatch(redirectToRoute(AppRoutes.Main));
});

export const registerAction = createAsyncThunk<
  void,
  RegData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/register', async ({ name, email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Register, { name, email, password });
  setToken(data.token);
  dispatch(setUserInfo({ avatarUrl: data.avatarUrl, name: data.name }));
  dispatch(redirectToRoute(AppRoutes.Main));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  removeToken();
});
