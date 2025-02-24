import classNames from 'classnames';
import { useState } from 'react';
import { User } from '../types/User';
import { getUser } from '../api/posts';

interface Props {
  usersList: User[];
  setUser: (user: User) => void;
  getPostList: () => void;
}

export const UserSelector: React.FC<Props> = ({
  usersList,
  setUser,
  getPostList,
}) => {
  const [dropdownIsActive, setDropdowmIsActive] = useState(false);

  const getUserById = async (id: string) => {
    return getUser(id).then(setUser);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropdownIsActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setDropdowmIsActive(prev => !prev);
          }}
          onBlur={() => setDropdowmIsActive(prev => !prev)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersList.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onMouseDown={() => {
                getUserById(`${+user.id}`);
                getPostList();
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
