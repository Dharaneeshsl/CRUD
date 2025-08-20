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
    <div>
      
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
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
