import { client } from '../../src/utils/fetchClient';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

export const getUsers = async () => {
  const users = await client.get<User[]>('/users');

  return users;
};

export const getPosts = async (id: number | undefined) => {
  const posts = await client.get<Post[]>(`/posts?userId=${id}`);

  return posts;
};

export const getComments = async (id: number | undefined) => {
  const comments = await client.get<Comment[]>(`/comments?postId=${id}`);

  return comments;
};
