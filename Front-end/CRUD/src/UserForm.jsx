import { useState, useEffect } from "react";
import axios from "axios";

function UserForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        address: initialData.address || "",
      });
    } else {
      setFormData({ name: "", email: "", address: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: "", email: "", address: "" });
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Request failed";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark p-3 rounded">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <div className="d-flex gap-2">
        <button className="btn btn-success" type="submit" disabled={submitting}>
          {initialData ? "Update User" : "Add User"}
        </button>
        {initialData && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
