import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "../styles.css";


type Unit = {
  _id: string;
  unitId: string;
};

type Tenant = {
  _id: string;
  tenantName: string;
  phone: string;
  email?: string;
  unit: Unit | string;
  moveInDate?: string;
};

const Tenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [tenantName, setTenantName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [unit, setUnit] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const getTenants = async () => {
    try {
      const response = await fetch("http://localhost:5000/tenants");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setTenants(data.tenants ?? []);
    } catch (error) {
      console.error("Error getting tenants:", error);
      setMessage("Unable to load tenants");
    }
  };

  const getUnits = async () => {
    try {
      const response = await fetch("http://localhost:5000/units");
      const data = await response.json();
      if (response.ok) setUnits(data.units ?? []);
    } catch (error) {
      console.error("Error getting units:", error);
    }
  };

  useEffect(() => {
    void getTenants();
    void getUnits();
  }, []);

  const clearForm = () => {
    setTenantName("");
    setPhone("");
    setEmail("");
    setUnit("");
    setMoveInDate("");
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        editingId ? `http://localhost:5000/tenants/${editingId}` : "http://localhost:5000/tenants",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tenantName, phone, email, unit, moveInDate }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
      clearForm();
      void getTenants();
    } catch (error) {
      console.error("Error saving tenant:", error);
      setMessage("Unable to save tenant");
    }
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingId(tenant._id);
    setTenantName(tenant.tenantName);
    setPhone(tenant.phone);
    setEmail(tenant.email ?? "");
    setUnit(typeof tenant.unit === "string" ? tenant.unit : tenant.unit._id);
    setMoveInDate(tenant.moveInDate ?? "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;
    try {
      const response = await fetch(`http://localhost:5000/tenants/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
      void getTenants();
    } catch (error) {
      console.error("Error deleting tenant:", error);
      setMessage("Unable to delete tenant");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <div className="units-page">
          <h1 className="page-title">Tenants</h1>
          <section className="unit-form-card">
            <h2>{editingId ? "Edit Tenant" : "Add Tenant"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="unit-form-row">
                <div className="unit-field">
                  <label htmlFor="tenant-name">Tenant Name</label>
                  <input id="tenant-name" value={tenantName} onChange={(event) => setTenantName(event.target.value)} placeholder="Enter tenant name" required />
                </div>
                <div className="unit-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Enter phone number" required />
                </div>
                <div className="unit-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email address" />
                </div>
                <div className="unit-field">
                  <label htmlFor="unit">Unit</label>
                  <select id="unit" value={unit} onChange={(event) => setUnit(event.target.value)} required>
                    <option value="">Select unit</option>
                    {units.map((availableUnit) => <option key={availableUnit._id} value={availableUnit._id}>{availableUnit.unitId}</option>)}
                  </select>
                </div>
                <div className="unit-field">
                  <label htmlFor="move-in-date">Move-in Date</label>
                  <input id="move-in-date" type="date" value={moveInDate} onChange={(event) => setMoveInDate(event.target.value)} />
                </div>
              </div>
              <div className="unit-form-buttons">
                <button type="submit" className="add-unit-button">{editingId ? "Update Tenant" : "Add Tenant"}</button>
                {editingId && <button type="button" className="cancel-unit-button" onClick={clearForm}>Cancel</button>}
              </div>
            </form>
          </section>
          {message && <div className="unit-message">{message}</div>}
          <section className="unit-list-card">
            <h2>Tenants List</h2>
            <div className="unit-table-wrapper">
              <table className="units-table">
                <thead><tr><th>TENANT NAME</th><th>PHONE</th><th>EMAIL</th><th>UNIT</th><th>MOVE-IN DATE</th><th>ACTIONS</th></tr></thead>
                <tbody>
                  {tenants.length === 0 ? (
                    <tr><td colSpan={6} className="no-units">No tenants found</td></tr>
                  ) : tenants.map((tenant) => (
                    <tr key={tenant._id}>
                      <td>{tenant.tenantName}</td><td>{tenant.phone}</td><td>{tenant.email || "—"}</td>
                      <td>{typeof tenant.unit === "string" ? tenant.unit : tenant.unit?.unitId || "—"}</td><td>{tenant.moveInDate || "—"}</td>
                      <td><div className="unit-actions"><button className="edit-button" onClick={() => handleEdit(tenant)}>Edit</button><button className="delete-button" onClick={() => void handleDelete(tenant._id)}>Delete</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Tenants;
