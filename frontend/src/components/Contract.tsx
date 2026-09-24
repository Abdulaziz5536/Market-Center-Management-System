import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Sidebar from "../Sidebar";
import "../styles.css";

type Tenant = { _id: string; tenantName: string; phone: string };
type ContractFile = { name: string; type: string; data: string };
type Contract = {
  _id: string;
  tenant: Tenant | string;
  amount: number;
  leaseStartDate: string;
  leaseEndDate: string;
  paymentFrequency: "Monthly" | "Quarterly" | "Yearly";
  status: "Pending" | "Paid" | "Expired";
  contractFile?: ContractFile;
};

const API_URL = "http://localhost:5000";

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [tenant, setTenant] = useState("");
  const [amount, setAmount] = useState("");
  const [leaseStartDate, setLeaseStartDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("Monthly");
  const [status, setStatus] = useState("Pending");
  const [contractFile, setContractFile] = useState<ContractFile | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const [contractsResponse, tenantsResponse] = await Promise.all([
        fetch(`${API_URL}/contracts`),
        fetch(`${API_URL}/tenants`),
      ]);
      const [contractsData, tenantsData] = await Promise.all([
        contractsResponse.json(),
        tenantsResponse.json(),
      ]);
      if (!contractsResponse.ok) throw new Error(contractsData.message);
      setContracts(contractsData.contracts ?? []);
      if (tenantsResponse.ok) setTenants(tenantsData.tenants ?? []);
    } catch (error) {
      console.error("Error loading contracts:", error);
      setMessage("Unable to load contracts");
    }
  };

  useEffect(() => { void loadData(); }, []);

  const clearForm = () => {
    setTenant("");
    setAmount("");
    setLeaseStartDate("");
    setLeaseEndDate("");
    setPaymentFrequency("Monthly");
    setStatus("Pending");
    setContractFile(null);
    setEditingId(null);
  };

  const readFile = (file: File): Promise<ContractFile> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, data: String(reader.result) });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return setContractFile(null);
    try {
      setContractFile(await readFile(file));
    } catch {
      setMessage("Unable to read the selected file");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      tenant,
      amount: Number(amount),
      leaseStartDate,
      leaseEndDate,
      paymentFrequency,
      status,
      ...(contractFile && { contractFile }),
    };
    try {
      const response = await fetch(editingId ? `${API_URL}/contracts/${editingId}` : `${API_URL}/contracts`, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
      clearForm();
      void loadData();
    } catch (error) {
      console.error("Error saving contract:", error);
      setMessage(error instanceof Error ? error.message : "Unable to save contract");
    }
  };

  const handleEdit = (contract: Contract) => {
    setEditingId(contract._id);
    setTenant(typeof contract.tenant === "string" ? contract.tenant : contract.tenant._id);
    setAmount(String(contract.amount));
    setLeaseStartDate(contract.leaseStartDate);
    setLeaseEndDate(contract.leaseEndDate);
    setPaymentFrequency(contract.paymentFrequency);
    setStatus(contract.status);
    setContractFile(contract.contractFile ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contract?")) return;
    try {
      const response = await fetch(`${API_URL}/contracts/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
      void loadData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete contract");
    }
  };

  const filteredContracts = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return contracts.filter((contract) => {
      const name = typeof contract.tenant === "string" ? contract.tenant : contract.tenant?.tenantName;
      return name?.toLowerCase().includes(searchTerm);
    });
  }, [contracts, search]);

  const tenantName = (contractTenant: Contract["tenant"]) =>
    typeof contractTenant === "string" ? contractTenant : contractTenant?.tenantName ?? "—";

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <div className="units-page contracts-page">
          <h1 className="page-title">Contracts</h1>
          <section className="unit-form-card">
            <h2>{editingId ? "Edit Contract" : "Add Contract"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="contract-form-grid">
                <div className="unit-field">
                  <label htmlFor="contract-tenant">Tenant</label>
                  <select id="contract-tenant" value={tenant} onChange={(event) => setTenant(event.target.value)} required>
                    <option value="">Select Tenant</option>
                    {tenants.map((availableTenant) => <option key={availableTenant._id} value={availableTenant._id}>{availableTenant.tenantName}</option>)}
                  </select>
                </div>
                <div className="unit-field"><label htmlFor="contract-amount">Amount (Br)</label><input id="contract-amount" type="number" min="0" step="0.01" placeholder="Amount (Br)" value={amount} onChange={(event) => setAmount(event.target.value)} required /></div>
                <div className="unit-field"><label htmlFor="lease-start">Lease Start Date</label><input id="lease-start" type="date" value={leaseStartDate} onChange={(event) => setLeaseStartDate(event.target.value)} required /></div>
                <div className="unit-field"><label htmlFor="lease-end">Lease End Date</label><input id="lease-end" type="date" value={leaseEndDate} onChange={(event) => setLeaseEndDate(event.target.value)} required /></div>
                <div className="unit-field"><label htmlFor="frequency">Payment Frequency</label><select id="frequency" value={paymentFrequency} onChange={(event) => setPaymentFrequency(event.target.value)}><option>Monthly</option><option>Quarterly</option><option>Yearly</option></select></div>
                <div className="unit-field"><label htmlFor="contract-status">Status</label><select id="contract-status" value={status} onChange={(event) => setStatus(event.target.value)}><option>Pending</option><option>Paid</option><option>Expired</option></select></div>
                <div className="unit-field contract-file-field"><label htmlFor="contract-file">Contract Photo/PDF</label><input id="contract-file" type="file" accept="image/*,.pdf,application/pdf" onChange={(event) => void handleFileChange(event)} /></div>
              </div>
              <div className="unit-form-buttons"><button type="submit" className="add-unit-button">{editingId ? "Update Contract" : "Add Contract"}</button>{editingId && <button type="button" className="cancel-unit-button" onClick={clearForm}>Cancel</button>}</div>
            </form>
          </section>
          {message && <div className="unit-message">{message}</div>}
          <section className="contract-list-section">
            <h2>Contracts List</h2>
            <input className="contract-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search contracts..." />
            <div className="unit-table-wrapper">
              <table className="units-table">
                <thead><tr><th>TENANT</th><th>AMOUNT</th><th>LEASE START</th><th>LEASE END</th><th>PAYMENT</th><th>STATUS</th><th>FILE</th><th>ACTIONS</th></tr></thead>
                <tbody>{filteredContracts.length === 0 ? <tr><td colSpan={8} className="no-units">No contracts found</td></tr> : filteredContracts.map((contract) => <tr key={contract._id}><td>{tenantName(contract.tenant)}</td><td>Br {contract.amount}</td><td>{contract.leaseStartDate}</td><td>{contract.leaseEndDate}</td><td>{contract.paymentFrequency}</td><td><span className={`contract-status ${contract.status.toLowerCase()}`}>{contract.status}</span></td><td>{contract.contractFile ? <a href={contract.contractFile.data} download={contract.contractFile.name}>View file</a> : "—"}</td><td><div className="unit-actions"><button className="edit-button" onClick={() => handleEdit(contract)}>Edit</button><button className="delete-button" onClick={() => void handleDelete(contract._id)}>Delete</button></div></td></tr>)}</tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contracts;
