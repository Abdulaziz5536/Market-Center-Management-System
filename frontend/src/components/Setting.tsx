import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { apiFetch } from "../api";
import "../styles.css";

type AccessLevel = "admin" | "readonly";

interface User {
  _id: string;
  name: string;
  email: string;
  accessLevel: AccessLevel;
}

const API_URL = "http://localhost:5000/auth";

const Setting = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] =
    useState<AccessLevel>("readonly");

  const token = localStorage.getItem("token");

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const currentUserId = String(
    currentUser.id ?? currentUser._id ?? ""
  );

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAccessLevel("readonly");
    setEditingUser(null);
    setShowForm(false);
  };

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load users.");
      }

      setUsers(data.users || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      const isEditing = Boolean(editingUser);

      const payload: {
        name: string;
        email: string;
        password?: string;
        accessLevel: AccessLevel;
      } = {
        name: name.trim(),
        email: email.trim(),
        accessLevel,
      };

      if (!isEditing || password.trim()) {
        payload.password = password;
      }

      const response = await fetch(
        isEditing
          ? `${API_URL}/${editingUser!._id}`
          : `${API_URL}/register`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${isEditing ? "update" : "create"} user.`
        );
      }

      setMessage(
        isEditing
          ? "User updated successfully."
          : "User created successfully."
      );

      resetForm();
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setAccessLevel(user.accessLevel);
    setShowForm(true);
    setMessage("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (user: User) => {
    if (user._id === currentUserId) {
      setError("You cannot delete your own account.");
      setMessage("");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user.");
      }

      setMessage("User deleted successfully.");
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while deleting the user."
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="page-content settings-page">
        <header className="page-header">
          <h1 className="page-title">Settings</h1>
        </header>

        <section className="settings-section">
          <div className="settings-heading">
            <div>
              <h2>User Management</h2>
              <p>
                Create accounts and manage user access to the system.
              </p>
            </div>

            <button
              type="button"
              className="settings-primary-button"
              onClick={() => {
                if (showForm && !editingUser) {
                  resetForm();
                } else {
                  resetForm();
                  setShowForm(true);
                }

                setMessage("");
                setError("");
              }}
            >
              {showForm && !editingUser
                ? "Cancel"
                : "+ Add User"}
            </button>
          </div>

          {message && (
            <div className="settings-message success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="settings-message error-message">
              {error}
            </div>
          )}

          {showForm && (
            <form
              className="settings-form"
              onSubmit={handleSubmit}
            >
              <h3>
                {editingUser ? "Edit User" : "Create New User"}
              </h3>

              <div className="settings-form-grid">
                <label>
                  Full Name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </label>

                <label>
                  {editingUser
                    ? "New Password (optional)"
                    : "Password"}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      editingUser
                        ? "Leave blank to keep current password"
                        : "At least 6 characters"
                    }
                    minLength={6}
                    required={!editingUser}
                    autoComplete="new-password"
                  />
                </label>

                <label>
                  Access Level
                  <select
                    value={accessLevel}
                    onChange={(e) =>
                      setAccessLevel(e.target.value as AccessLevel)
                    }
                    required
                  >
                    <option value="readonly">
                      Read Only
                    </option>
                    <option value="admin">
                      Administrator
                    </option>
                  </select>
                </label>
              </div>

              <div className="settings-form-actions">
                <button
                  type="button"
                  className="settings-secondary-button"
                  onClick={resetForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="settings-primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingUser
                      ? "Save Changes"
                      : "Create User"}
                </button>
              </div>
            </form>
          )}

          <div className="settings-table-card">
            <div className="settings-table-heading">
              <h3>System Users</h3>
              <span>{users.length} users</span>
            </div>

            {loading ? (
              <p className="settings-empty">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="settings-empty">
                No users found.
              </p>
            ) : (
              <div className="settings-table-wrapper">
                <table className="settings-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Access Level</th>
                      <th>Account</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="settings-user-name">
                          {user.name}
                        </td>

                        <td>{user.email}</td>

                        <td>
                          <span
                            className={`access-badge ${
                              user.accessLevel === "admin"
                                ? "admin-badge"
                                : "readonly-badge"
                            }`}
                          >
                            {user.accessLevel === "admin"
                              ? "Administrator"
                              : "Read Only"}
                          </span>
                        </td>

                        <td>
                          {user._id === currentUserId ? (
                            <span className="current-user-label">
                              You
                            </span>
                          ) : (
                            "User"
                          )}
                        </td>

                        <td>
                          <div className="settings-row-actions">
                            <button
                              type="button"
                              className="settings-edit-button"
                              onClick={() => handleEdit(user)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="settings-delete-button"
                              onClick={() => void handleDelete(user)}
                              disabled={user._id === currentUserId}
                              title={
                                user._id === currentUserId
                                  ? "You cannot delete your own account"
                                  : "Delete user"
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Setting;