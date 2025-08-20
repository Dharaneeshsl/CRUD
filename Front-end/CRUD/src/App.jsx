import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      if (err?.response?.status === 404) {
        setUsers([]);
      } else {
        console.error("Error fetching users:", err);
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    await axios.post("/api/user", userData);
    fetchUsers();
  };

  const updateUser = async (id, userData) => {
    await axios.put(`/api/user/update/${id}`, userData);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/user/delete/${id}`);
    fetchUsers();
    if (editingUser && editingUser._id === id) {
      setEditingUser(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      await updateUser(editingUser._id, formData);
      setEditingUser(null);
    } else {
      await addUser(formData);
    }
  };

  const handleStartEdit = async (user) => {
    try {
      const res = await axios.get(`/api/user/${user._id}`);
      setEditingUser(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Failed to load user";
      alert(message);
      fetchUsers();
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-dark mb-4">CRUD APP</h1>
      <div className="mb-4">
        <UserForm
          onSubmit={handleFormSubmit}
          initialData={editingUser}
          onCancel={() => setEditingUser(null)}
        />
      </div>
      <UserTable
        users={users}
        onDelete={deleteUser}
        isLoading={isLoading}
        onEdit={handleStartEdit}
      />
    </div>
  );
}


export default App;
