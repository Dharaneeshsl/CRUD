import { FaTrash, FaEdit, FaSpinner } from "react-icons/fa";
import "./UserTable.css";

function UserTable({ users, onDelete, isLoading, onEdit }) {
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <FaSpinner className="fa-spin me-2" />
        Loading users...
      </div>
    );
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th className="bg-dark text-white">Name</th>
            <th className="bg-dark text-white">Email</th>
            <th className="bg-dark text-white">Address</th>
            <th className="bg-dark text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(user)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(user._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
