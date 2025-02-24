import classNames from 'classnames';
import { useState } from 'react';
import { User } from '../types/User';

interface Props {
  usersList: User[];
  setUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({ usersList, setUser }) => {
  const [dropdownIsActive, setDropdowmIsActive] = useState(false);

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
                setUser(user);
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
