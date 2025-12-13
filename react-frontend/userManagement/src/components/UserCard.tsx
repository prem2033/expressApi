// components/UserCard.tsx

import type { User } from "../types/user";
import "../style/style.css";

interface Props {
  user: User;
  onDelete: (id: string) => void;
}

export const UserCard = ({ user, onDelete }: Props) => {
  return (
    <div className="card">
      <h3>{user.userName}</h3>
      <p>
        <b>Username:</b> {user.userName}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Phone:</b> {user.phone}
      </p>
      <p>
        <b>Address:</b> {user.address}
      </p>

      <button className="delete-btn" onClick={() => onDelete(user.userName)}>
        Delete
      </button>
    </div>
  );
};
