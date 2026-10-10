import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Sidebar from "../Sidebar";
import { isAdmin } from "../utils/auth";
import { apiFetch } from "../api";
import "../styles.css";

type Unit = { _id: string; unitId: string };
type ReceiptFile = { name: string; type: string; data: string };
type Utility = {
  _id: string;
  unit: Unit | string;
  utilityType: "Electricity" | "Water" |  "Other";
  billingMonth: string;
  amount: number;
  dueDate: string;
  status: "Pending" | "Paid" | "Overdue";
  receiptFile?: ReceiptFile;
};



const Utilities = () => {

  const admin = isAdmin();
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [unit, setUnit] = useState("");
  const [utilityType, setUtilityType] = useState("Electricity");
  const [billingMonth, setBillingMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [receiptFile, setReceiptFile] = useState<ReceiptFile | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const [utilitiesResponse, unitsResponse] = await Promise.all([apiFetch(`/utilities`), apiFetch(`/units`)]);
      const [utilitiesData, unitsData] = await Promise.all([utilitiesResponse.json(), unitsResponse.json()]);
      if (!utilitiesResponse.ok) throw new Error(utilitiesData.message);
      setUtilities(utilitiesData.utilities ?? []);
      if (unitsResponse.ok) setUnits(unitsData.units ?? []);
    } catch (error) {
      console.error("Error loading utilities:", error);
      setMessage("Unable to load utilities");
    }
  };

  useEffect(() => { void loadData(); }, []);

  const clearForm = () => {
    setUnit(""); setUtilityType("Electricity"); setBillingMonth(""); setAmount(""); setDueDate(""); setStatus("Pending"); setReceiptFile(null); setEditingId(null);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return setReceiptFile(null);
    const reader = new FileReader();
    reader.onload = () => setReceiptFile({ name: file.name, type: file.type, data: String(reader.result) });
    reader.onerror = () => setMessage("Unable to read the selected receipt");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { unit, utilityType, billingMonth, amount: Number(amount), dueDate, status, ...(receiptFile && { receiptFile }) };
    try {
      const response = await apiFetch(editingId ? `/utilities/${editingId}` : `/utilities`, {
        method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message); clearForm(); void loadData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save utility bill");
    }
  };

  const handleEdit = (utility: Utility) => {
    setEditingId(utility._id);
    setUnit(typeof utility.unit === "string" ? utility.unit : utility.unit._id);
    setUtilityType(utility.utilityType); setBillingMonth(utility.billingMonth); setAmount(String(utility.amount)); setDueDate(utility.dueDate); setStatus(utility.status); setReceiptFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this utility bill?")) return;
    try {
      const response = await apiFetch(`/utilities/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message); void loadData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete utility bill");
    }
  };

  const downloadReceipt = async (id: string) => {
    try {
      const response = await apiFetch(`/utilities/${id}`);
      const data = await response.json();
      if (!response.ok || !data.utility?.receiptFile?.data) throw new Error("Receipt not found");
      const link = document.createElement("a");
      link.href = data.utility.receiptFile.data;
      link.download = data.utility.receiptFile.name;
      link.click();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to download receipt");
    }
  };

  const filteredUtilities = useMemo(() => utilities.filter((utility) => {
    const unitName = typeof utility.unit === "string" ? utility.unit : utility.unit?.unitId;
    return `${unitName} ${utility.utilityType} ${utility.status}`.toLowerCase().includes(search.toLowerCase());
  }), [utilities, search]);

  const unitName = (utilityUnit: Utility["unit"]) => typeof utilityUnit === "string" ? utilityUnit : utilityUnit?.unitId ?? "—";

  return <div className="app-layout"><Sidebar /><main className="page-content"><div className="units-page contracts-page">
    <h1
      className="page-title refresh-page-title"
      role="button"
      tabIndex={0}
      title="Click to refresh utilities"
      onClick={() => void loadData()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          void loadData();
        }
      }}
    >Utilities</h1>
    
    { admin && (<section className="unit-form-card"><h2>{editingId ? "Edit Utility Bill" : "Add Utility Bill"}</h2><form onSubmit={handleSubmit}>
      <div className="contract-form-grid">
        <div className="unit-field"><label htmlFor="utility-unit">Unit</label><select id="utility-unit" value={unit} onChange={(event) => setUnit(event.target.value)} required><option value="">Select Unit</option>{units.map((availableUnit) => <option key={availableUnit._id} value={availableUnit._id}>{availableUnit.unitId}</option>)}</select></div>
        <div className="unit-field"><label htmlFor="utility-type">Utility Type</label><select id="utility-type" value={utilityType} onChange={(event) => setUtilityType(event.target.value)}><option>Electricity</option><option>Water</option><option>Other</option></select></div>
        <div className="unit-field"><label htmlFor="billing-month">Billing Month</label><input id="billing-month" type="month" value={billingMonth} onChange={(event) => setBillingMonth(event.target.value)} required /></div>
        <div className="unit-field"><label htmlFor="utility-amount">Amount (Br)</label><input id="utility-amount" type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount (Br)" required /></div>
        <div className="unit-field"><label htmlFor="due-date">Due Date</label><input id="due-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} required /></div>
        <div className="unit-field"><label htmlFor="utility-status">Status</label><select id="utility-status" value={status} onChange={(event) => setStatus(event.target.value)}><option>Pending</option><option>Paid</option><option>Overdue</option></select></div>
        <div className="unit-field contract-file-field"><label htmlFor="receipt-file">Receipt Photo/PDF (optional)</label><input id="receipt-file" type="file" accept="image/*,.pdf,application/pdf" onChange={handleFileChange} /></div>
      </div>
      <div className="unit-form-buttons"><button type="submit" className="add-unit-button">{editingId ? "Update Utility Bill" : "Add Utility Bill"}</button>{editingId && <button type="button" className="cancel-unit-button" onClick={clearForm}>Cancel</button>}</div>
    </form></section> )}
    {message && <div className="unit-message">{message}</div>}
    <section className="contract-list-section"><h2>Utilities List</h2><input className="contract-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search utilities..." />
      <div className="unit-table-wrapper"><table className="units-table"><thead><tr><th>UNIT</th><th>TYPE</th><th>BILLING MONTH</th><th>AMOUNT</th><th>DUE DATE</th><th>STATUS</th><th>RECEIPT</th><th>ACTIONS</th></tr></thead><tbody>
        {filteredUtilities.length === 0 ? <tr><td colSpan={8} className="no-units">No utility bills found</td></tr> : filteredUtilities.map((utility) => <tr key={utility._id}><td>{unitName(utility.unit)}</td><td>{utility.utilityType}</td><td>{utility.billingMonth}</td><td>Br {utility.amount}</td><td>{utility.dueDate}</td><td><span className={`contract-status ${utility.status.toLowerCase()}`}>{utility.status}</span></td><td>{utility.receiptFile ? <button type="button" className="file-link-button" onClick={() => void downloadReceipt(utility._id)}>View receipt</button> : "—"}</td>
        <td><div className="unit-actions"> {admin && (<button className="edit-button" onClick={() => handleEdit(utility)}>Edit</button> )} {admin && (<button className="delete-button" onClick={() => void handleDelete(utility._id)}>Delete</button> )}</div></td></tr>)}
      </tbody></table></div>
    </section>
  </div></main></div>;
};

export default Utilities;
