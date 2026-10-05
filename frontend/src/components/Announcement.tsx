import {useEffect, useMemo, useState, type FormEvent,} from "react";

import Sidebar from "../Sidebar";
import "../styles.css";

type Announcement = {
  _id: string;
  title: string;
  announcementType:
    | "General"
    | "Maintenance"
    | "Emergency"
    | "Payment"
    | "Utility"
    | "Contract"
    | "Other";
  message: string;
  audience:
    | "All Tenants"
    | "Specific Unit"
    | "All Staff";
  scheduledDate: string;
  deliveryType: "Email" | "SMS" | "Both";
};

const API_URL = "http://localhost:5000";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<
    Announcement[]
  >([]);

  const [title, setTitle] = useState("");
  const [announcementType, setAnnouncementType] =
    useState("General");

  const [message, setMessage] = useState("");

  const [audience, setAudience] =
    useState("All Tenants");

  const [scheduledDate, setScheduledDate] =
    useState("");

  const [deliveryType, setDeliveryType] =
    useState("Email");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [formMessage, setFormMessage] =
    useState("");

  const loadAnnouncements = async () => {
    try {
      const response = await fetch(
        `${API_URL}/announcement`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAnnouncements(data.announcements ?? []);
    } catch (error) {
      console.error(
        "Error loading announcements:",
        error
      );

      setFormMessage(
        "Unable to load announcements"
      );
    }
  };

  useEffect(() => {
    void loadAnnouncements();
  }, []);

  const clearForm = () => {
    setTitle("");
    setAnnouncementType("General");
    setMessage("");
    setAudience("All Tenants");
    setScheduledDate("");
    setDeliveryType("Email");
    setEditingId(null);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormMessage("");

    const payload = {
      title,
      announcementType,
      message,
      audience,
      scheduledDate,
      deliveryType,
    };

    try {
      const response = await fetch(
        editingId
          ? `${API_URL}/announcement/${editingId}`
          : `${API_URL}/announcement`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setFormMessage(data.message);

      clearForm();

      await loadAnnouncements();
    } catch (error) {
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Unable to save announcement"
      );
    }
  };

  const handleEdit = (
    announcement: Announcement
  ) => {
    setEditingId(announcement._id);

    setTitle(announcement.title);

    setAnnouncementType(
      announcement.announcementType
    );

    setMessage(announcement.message);

    setAudience(announcement.audience);

    const date = new Date(
      announcement.scheduledDate
    );

    const formattedDate =
      date.toISOString().slice(0, 16);

    setScheduledDate(formattedDate);

    setDeliveryType(
      announcement.deliveryType
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/announcement/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setFormMessage(data.message);

      await loadAnnouncements();
    } catch (error) {
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete announcement"
      );
    }
  };

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      const searchText = `
        ${announcement.title}
        ${announcement.announcementType}
        ${announcement.audience}
        ${announcement.deliveryType}
      `.toLowerCase();

      return searchText.includes(
        search.toLowerCase()
      );
    });
  }, [announcements, search]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="page-content">
        <div className="units-page contracts-page">

          <h1
            className="page-title refresh-page-title"
            role="button"
            tabIndex={0}
            title="Click to refresh announcements"
            onClick={() => void loadAnnouncements()}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                void loadAnnouncements();
              }
            }}
          >
            Announcements
          </h1>

         

          <section className="unit-form-card">
            <h2>
              {editingId
                ? "Edit Announcement"
                : "Add Announcement"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="contract-form-grid">

               

                <div className="unit-field">
                  <label htmlFor="announcement-title">
                    Title
                  </label>

                  <input
                    id="announcement-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    placeholder="Announcement title"
                    required
                  />
                </div>

                

                <div className="unit-field">
                  <label htmlFor="announcement-type">
                    Announcement Type
                  </label>

                  <select
                    id="announcement-type"
                    value={announcementType}
                    onChange={(event) =>
                      setAnnouncementType(
                        event.target.value
                      )
                    }
                    required
                  >
                    <option value="General">
                      General
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>

                    <option value="Emergency">
                      Emergency
                    </option>

                    <option value="Payment">
                      Payment
                    </option>

                    <option value="Utility">
                      Utility
                    </option>

                    <option value="Contract">
                      Contract
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                

                <div className="unit-field">
                  <label htmlFor="announcement-audience">
                    Audience
                  </label>

                  <select
                    id="announcement-audience"
                    value={audience}
                    onChange={(event) =>
                      setAudience(
                        event.target.value
                      )
                    }
                    required
                  >
                    <option value="All Tenants">
                      All Tenants
                    </option>

                    <option value="Specific Unit">
                      Specific Unit
                    </option>

                    <option value="All Staff">
                      All Staff
                    </option>
                  </select>
                </div>

                

                <div className="unit-field">
                  <label htmlFor="scheduled-date">
                    Scheduled Date
                  </label>

                  <input
                    id="scheduled-date"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(event) =>
                      setScheduledDate(
                        event.target.value
                      )
                    }
                    required
                  />
                </div>

                

                <div className="unit-field">
                  <label htmlFor="delivery-type">
                    Delivery Type
                  </label>

                  <select
                    id="delivery-type"
                    value={deliveryType}
                    onChange={(event) =>
                      setDeliveryType(
                        event.target.value
                      )
                    }
                    required
                  >
                    <option value="Email">
                      Email
                    </option>

                    <option value="SMS">
                      SMS
                    </option>

                    <option value="Both">
                      Both
                    </option>
                  </select>
                </div>

              </div>

              

              <div
                className="unit-field announcement-message-field"
              >
                <label htmlFor="announcement-message">
                  Message
                </label>

                <textarea
                  id="announcement-message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="Write your announcement..."
                  rows={6}
                  required
                />
              </div>

              <div className="unit-form-buttons">

                <button
                  type="submit"
                  className="add-unit-button"
                >
                  {editingId
                    ? "Update Announcement"
                    : "Add Announcement"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="cancel-unit-button"
                    onClick={clearForm}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>
          </section>

          

          {formMessage && (
            <div className="unit-message">
              {formMessage}
            </div>
          )}

          

          <section className="contract-list-section">

            <h2>Announcements List</h2>

            <input
              className="contract-search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search announcements..."
            />

            <div className="unit-table-wrapper">

              <table className="units-table">

                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>TYPE</th>
                    <th>AUDIENCE</th>
                    <th>SCHEDULE</th>
                    <th>DELIVERY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredAnnouncements.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="no-units"
                      >
                        No announcements found
                      </td>
                    </tr>
                  ) : (
                    filteredAnnouncements.map(
                      (announcement) => (
                        <tr
                          key={announcement._id}
                        >

                          <td>
                            <strong>
                              {announcement.title}
                            </strong>

                            <div className="announcement-preview">
                              {announcement.message}
                            </div>
                          </td>

                          <td>
                            <span className="contract-status pending">
                              {
                                announcement.announcementType
                              }
                            </span>
                          </td>

                          <td>
                            {announcement.audience}
                          </td>

                          <td>
                            {formatDate(
                              announcement.scheduledDate
                            )}
                          </td>

                          <td>
                            {
                              announcement.deliveryType
                            }
                          </td>

                          <td>
                            <div className="unit-actions">

                              <button
                                className="edit-button"
                                onClick={() =>
                                  handleEdit(
                                    announcement
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-button"
                                onClick={() =>
                                  void handleDelete(
                                    announcement._id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>
                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
};

export default Announcements;