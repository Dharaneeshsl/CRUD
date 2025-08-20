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
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    await axios.post("http://localhost:5000/api/user", userData);
    fetchUsers();
  };

  const updateUser = async (id, userData) => {
    await axios.put(`http://localhost:5000/api/user/update/${id}`, userData);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/user/delete/${id}`);
    fetchUsers();
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      await updateUser(editingUser._id, formData);
      setEditingUser(null);
    } else {
      await addUser(formData);
    }
  };

  const handleStartEdit = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
