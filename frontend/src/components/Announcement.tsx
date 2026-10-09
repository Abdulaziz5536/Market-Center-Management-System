import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Sidebar from "../Sidebar";
import {isAdmin} from "../utils/auth";
import { apiFetch } from "../api";
import "../styles.css";

type Tenant = {
  _id: string;
  tenantName: string;
  phone: string;
  email?: string;
};

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

  audience: "All Tenants" | "Specific Tenants";

  targetTenants:
    | {
        _id: string;
        tenantName: string;
        phone: string;
        email?: string;
      }[]
    | string[];

  scheduledDate: string;

  deliveryType: "Email" | "SMS" | "Both";
};

const announcementTypes = [
  "General",
  "Maintenance",
  "Emergency",
  "Payment",
  "Utility",
  "Contract",
  "Other",
];

const Announcements = () => {

  const admin = isAdmin();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);

  const [title, setTitle] = useState("");
  const [announcementType, setAnnouncementType] =
    useState("General");

  const [message, setMessage] = useState("");

  const [audience, setAudience] = useState<
    "All Tenants" | "Specific Tenants"
  >("All Tenants");

  const [targetTenants, setTargetTenants] = useState<string[]>([]);

  const [scheduledDate, setScheduledDate] = useState("");

  const [deliveryType, setDeliveryType] = useState<
    "Email" | "SMS" | "Both"
  >("Email");

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [search, setSearch] = useState("");

  const [formMessage, setFormMessage] = useState("");

  

  const loadData = async () => {
    try {
      const [announcementResponse, tenantResponse] =
        await Promise.all([
          apiFetch("/announcement"),
          apiFetch("/tenants"),
        ]);

      const announcementData =
        await announcementResponse.json();

      const tenantData = await tenantResponse.json();

      if (announcementResponse.ok) {
        setAnnouncements(
          announcementData.announcements || []
        );
      }

      if (tenantResponse.ok) {
        setTenants(tenantData.tenants || []);
      }
    } catch (error) {
      console.error("Failed to load announcement data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  

  const clearForm = () => {
    setTitle("");
    setAnnouncementType("General");
    setMessage("");
    setAudience("All Tenants");
    setTargetTenants([]);
    setScheduledDate("");
    setDeliveryType("Email");
    setEditingId(null);
    setFormMessage("");
  };

  

  const handleTenantSelection = (
    tenantId: string
  ) => {
    setTargetTenants((current) => {
      if (current.includes(tenantId)) {
        return current.filter((id) => id !== tenantId);
      }

      return [...current, tenantId];
    });
  };

 

  const selectAllTenants = () => {
    setTargetTenants(
      tenants.map((tenant) => tenant._id)
    );
  };

  

  const clearSelectedTenants = () => {
    setTargetTenants([]);
  };

  

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormMessage("");

    if (
      audience === "Specific Tenants" &&
      targetTenants.length === 0
    ) {
      setFormMessage(
        "Please select at least one tenant."
      );

      return;
    }

    const payload = {
      title,
      announcementType,
      message,
      audience,

      targetTenants:
        audience === "Specific Tenants"
          ? targetTenants
          : [],

      scheduledDate,
      deliveryType,
    };

    try {
      const url = editingId
        ? `http://localhost:5000/announcements/${editingId}`
        : "http://localhost:5000/announcements";

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormMessage(
          data.message || "Something went wrong."
        );

        return;
      }

      setFormMessage(
        editingId
          ? "Announcement updated successfully."
          : "Announcement created successfully."
      );

      clearForm();

      await loadData();
    } catch (error) {
      console.error(error);

      setFormMessage(
        "Unable to connect to the server."
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

    
    if (announcement.audience === "Specific Tenants") {
      if (
        Array.isArray(announcement.targetTenants)
      ) {
        const ids = announcement.targetTenants.map(
          (tenant) =>
            typeof tenant === "string"
              ? tenant
              : tenant._id
        );

        setTargetTenants(ids);
      }
    } else {
      setTargetTenants([]);
    }

    
    if (announcement.scheduledDate) {
      const date = new Date(
        announcement.scheduledDate
      );

      const localDate = new Date(
        date.getTime() -
          date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      setScheduledDate(localDate);
    } else {
      setScheduledDate("");
    }

    setDeliveryType(
      announcement.deliveryType
    );

    setFormMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/announcement/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete announcement."
        );

        return;
      }

      await loadData();
    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to the server."
      );
    }
  };

 

  const getTenantName = (
    tenant:
      | string
      | {
          _id: string;
          tenantName: string;
          phone: string;
          email?: string;
        }
  ) => {
    if (typeof tenant !== "string") {
      return tenant.tenantName;
    }

    const foundTenant = tenants.find(
      (item) => item._id === tenant
    );

    return foundTenant
      ? foundTenant.tenantName
      : "Unknown Tenant";
  };

 

  const filteredAnnouncements = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    if (!searchValue) {
      return announcements;
    }

    return announcements.filter(
      (announcement) => {
        const tenantNames = Array.isArray(
          announcement.targetTenants
        )
          ? announcement.targetTenants
              .map((tenant) =>
                getTenantName(tenant)
              )
              .join(" ")
          : "";

        return (
          announcement.title
            .toLowerCase()
            .includes(searchValue) ||
          announcement.announcementType
            .toLowerCase()
            .includes(searchValue) ||
          announcement.message
            .toLowerCase()
            .includes(searchValue) ||
          announcement.audience
            .toLowerCase()
            .includes(searchValue) ||
          announcement.deliveryType
            .toLowerCase()
            .includes(searchValue) ||
          tenantNames
            .toLowerCase()
            .includes(searchValue)
        );
      }
    );
  }, [announcements, search, tenants]);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="page-content">
        <div className="units-page">
          <h1 className="page-title">
            Announcements
          </h1>

          

          { admin && (<div className="unit-form-card">
            <form onSubmit={handleSubmit}>
              <div className="contract-form-grid">
               
                <div className="unit-field">
                  <label>Title</label>

                  <input
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
                  <label>
                    Announcement Type
                  </label>

                  <select value={announcementType} onChange={(event) => setAnnouncementType(event.target.value)}>
                    {announcementTypes.map((type) => (
                        <option
                          key={type}
                          value={type} > {type}
                        </option>
                      )
                    )}
                  </select>
                </div>

               
                <div className="unit-field">
                  <label>
                    Audience
                  </label>

                  <select value={audience} onChange={(event) => { const value = event.target.value as | "All Tenants" | "Specific Tenants";

                      setAudience(value);

                      if (
                        value === "All Tenants"
                      ) {
                        setTargetTenants([]);
                      }
                    }}
                  >
                    <option value="All Tenants">
                      All Tenants
                    </option>

                    <option value="Specific Tenants">
                      Specific Tenants
                    </option>
                  </select>
                </div>

                
                <div className="unit-field">
                  <label>
                    Scheduled Date
                  </label>

                  <input
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
                  <label>
                    Delivery Type
                  </label>

                  <select
                    value={deliveryType}
                    onChange={(event) =>
                      setDeliveryType(
                        event.target.value as
                          | "Email"
                          | "SMS"
                          | "Both"
                      )
                    }
                  >

                    <option value="SMS">
                      SMS
                    </option>

                    <option value="Email">
                      Email
                    </option>

                    <option value="Both">
                      Both
                    </option>
                  </select>
                </div>
              </div>

              

              {audience ===
                "Specific Tenants" && (
                <div className="announcement-message-field">
                  <label className="announcement-select-label">
                    Select Tenants
                  </label>

                  <div className="announcement-tenant-actions">
                    <button
                      type="button"
                      className="select-all-button"
                      onClick={
                        selectAllTenants
                      }
                    >
                      Select All
                    </button>

                    <button
                      type="button"
                      className="clear-all-button"
                      onClick={
                        clearSelectedTenants
                      }
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="announcement-tenant-list">
                    {tenants.length === 0 ? (
                      <p>
                        No tenants available.
                      </p>
                    ) : (
                      tenants.map(
                        (tenant) => (
                          <label
                            key={tenant._id}
                            className="announcement-tenant-item"
                          >
                            <input
                              type="checkbox"
                              checked={targetTenants.includes(
                                tenant._id
                              )}
                              onChange={() =>
                                handleTenantSelection(
                                  tenant._id
                                )
                              }
                            />

                            <div>
                              <strong>
                                {
                                  tenant.tenantName
                                }
                              </strong>

                              <span>
                                {tenant.email ||
                                  tenant.phone}
                              </span>
                            </div>
                          </label>
                        )
                      )
                    )}
                  </div>

                  <p className="announcement-selected-count">
                    {targetTenants.length} tenant
                    {targetTenants.length !== 1
                      ? "s"
                      : ""}{" "}
                    selected
                  </p>
                </div>
              )}

              
              <div className="announcement-message-field">
                <label>
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  placeholder="Write your announcement message..."
                  rows={6}
                  required
                />
              </div>

             
              {formMessage && (
                <p className="unit-message">
                  {formMessage}
                </p>
              )}

              
               <div className="unit-form-buttons">
                <button
                  type="submit"
                  className="add-unit-button"
                >
                  {editingId
                    ? "Update Announcement"
                    : "Create Announcement"}
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
          </div> )}

         

          <div className="unit-list-card">
            <div className="contract-list-header">
              <h2>Announcement List</h2>

              <input
                type="text"
                className="contract-search"
                placeholder="Search announcements..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="unit-table-wrapper">
              <table className="units-table">
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>TYPE</th>
                    <th>AUDIENCE</th>
                    <th>TENANTS</th>
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
                        colSpan={7}
                        style={{
                          textAlign: "center",
                          padding: "30px",
                        }}
                      >
                        No announcements found.
                      </td>
                    </tr>
                  ) : (
                    filteredAnnouncements.map(
                      (announcement) => (
                        <tr
                          key={
                            announcement._id
                          }
                        >
                         
                          <td>
                            <strong>
                              {
                                announcement.title
                              }
                            </strong>

                            <div className="announcement-preview">
                              {
                                announcement.message
                              }
                            </div>
                          </td>

                          
                          <td>
                            <span className="contract-status">
                              {
                                announcement.announcementType
                              }
                            </span>
                          </td>

                          
                          <td>
                            {
                              announcement.audience
                            }
                          </td>

                          
                          <td>
                            {announcement.audience ===
                            "All Tenants" ? (
                              "All Tenants"
                            ) : (
                              <div>
                                {Array.isArray(
                                  announcement.targetTenants
                                )
                                  ? announcement.targetTenants
                                      .map(
                                        (
                                          tenant
                                        ) =>
                                          getTenantName(
                                            tenant
                                          )
                                      )
                                      .join(
                                        ", "
                                      )
                                  : "No tenants"}
                              </div>
                            )}
                          </td>

                          
                          <td>
                            {new Date(
                              announcement.scheduledDate
                            ).toLocaleString()}
                          </td>

                          
                          <td>
                            {
                              announcement.deliveryType
                            }
                          </td>

                         
                          <td>
                            <div className="unit-actions">
                             { admin && ( <button
                                type="button"
                                className="edit-button"
                                onClick={() =>
                                  handleEdit(
                                    announcement
                                  )
                                }
                              >
                                Edit
                              </button> )}

                            {admin &&(  <button
                                type="button"
                                className="delete-button"
                                onClick={() =>
                                  handleDelete(
                                    announcement._id
                                  )
                                }
                              >
                                Delete
                              </button> )}
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Announcements;