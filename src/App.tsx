import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
//import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getPosts, getUsers } from './api/posts';
import { Post } from './types/Post';

export const App = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  //const [isHadPost, setIsHadPost] = useState(false)

  const filteredPostsList = () => {
    return postsList.filter(post => post.userId === user?.id);
  };

  useEffect(() => {
    getUsers().then(setUsersList);
  }, []);

  const getPostList = (id: number) => {
    setIsLoading(true);

    getPosts(id)
      .then(posts => setPostsList(posts))
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersList={usersList}
                  setUser={setUser}
                  getPostList={getPostList}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {filteredPostsList().length && !isError && !isLoading ? (
                  <PostsList filteredPostsList={filteredPostsList()} />
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!filteredPostsList().length && user && !isError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {/*    */}
              </div>
            </div>
          </div>

          {/* <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};
