// pages/UserList.tsx
import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { UserCard } from "./UserCard";
import { api } from "../services";
import "../style/style.css";
import { AddUserPanel } from "./AddUserPanel";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await api.getUsers<User>("user");
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    await api.deleteUser(`user/${id}`);
    const records = await api.getUsers<User>("user");
    setUsers(records);
  };

  const onAdd = async (data: any) => {
    await api.postUsers(data, `user`);
    const records = await api.getUsers<User>("user");
    setUsers(records);
  };

  return (
    <div className="page">
      {/* Add User Panel */}
      <AddUserPanel />

      {/* User List */}
      <div className="content">
        <div className="header">
          <h2>UserList</h2>
        </div>
        <div className="container">
          {users.map((user) => (
            <UserCard key={user._id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
