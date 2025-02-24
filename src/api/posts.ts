import { client } from '../../src/utils/fetchClient';
import { Post } from '../types/Post';
import { User } from '../types/User';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUser = (userId: string = '') => {
  return client.get<User>(`/users/${userId}`);
};

export const getPosts = (id: number | undefined) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};
