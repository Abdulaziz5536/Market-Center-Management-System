import { useEffect, useMemo, useState } from "react";
import Sidebar from "../Sidebar";
import "../styles.css";

type Unit = { _id: string; unitId: string; status: "Available" | "Occupied" };
type Tenant = { _id: string; tenantName: string };
type Contract = {
  _id: string;
  tenant: Tenant | string;
  amount: number;
  leaseEndDate: string;
  paymentFrequency: string;
  status: "Pending" | "Paid" | "Expired";
};
type Utility = {
  _id: string;
  utilityType: string;
  amount: number;
  dueDate: string;
  status: "Pending" | "Paid" | "Overdue";
  unit: Unit | string;
};

const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [unitsResponse, tenantsResponse, contractsResponse, utilitiesResponse] = await Promise.all([
        fetch(`${API_URL}/units`),
        fetch(`${API_URL}/tenants`),
        fetch(`${API_URL}/contracts`),
        fetch(`${API_URL}/utilities`),
      ]);
      const [unitsData, tenantsData, contractsData, utilitiesData] = await Promise.all([
        unitsResponse.json(), tenantsResponse.json(), contractsResponse.json(), utilitiesResponse.json(),
      ]);
      if (![unitsResponse, tenantsResponse, contractsResponse, utilitiesResponse].every((response) => response.ok)) {
        throw new Error("Unable to load dashboard data");
      }
      setUnits(unitsData.units ?? []);
      setTenants(tenantsData.tenants ?? []);
      setContracts(contractsData.contracts ?? []);
      setUtilities(utilitiesData.utilities ?? []);
    } catch (error) {
      console.error("Dashboard loading error:", error);
      setMessage("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadDashboard(); }, []);

  const summary = useMemo(() => {
    const occupiedUnits = units.filter((unit) => unit.status === "Occupied").length;
    const activeContracts = contracts.filter((contract) => contract.status !== "Expired");
    const outstandingContracts = contracts.filter((contract) => contract.status === "Pending");
    const outstandingUtilities = utilities.filter((utility) => utility.status !== "Paid");
    return {
      occupiedUnits,
      availableUnits: units.length - occupiedUnits,
      activeContracts: activeContracts.length,
      monthlyIncome: contracts.filter((contract) => contract.status === "Paid").reduce((total, contract) => {
        const monthlyAmount = contract.paymentFrequency === "Quarterly"
          ? contract.amount / 3
          : contract.paymentFrequency === "Yearly"
            ? contract.amount / 12
            : contract.amount;
        return total + monthlyAmount;
      }, 0),
      outstanding: outstandingContracts.reduce((total, contract) => total + contract.amount, 0) + outstandingUtilities.reduce((total, utility) => total + utility.amount, 0),
      pendingItems: outstandingContracts.length + outstandingUtilities.length,
    };
  }, [units, contracts, utilities]);

  const tenantName = (tenant: Contract["tenant"]) => typeof tenant === "string" ? tenant : tenant?.tenantName ?? "—";
  const unitName = (unit: Utility["unit"]) => typeof unit === "string" ? unit : unit?.unitId ?? "—";
  const recentContracts = contracts.slice(0, 5);
  const outstandingUtilities = utilities.filter((utility) => utility.status !== "Paid").slice(0, 5);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <div className="units-page dashboard-page">
          <div className="dashboard-heading">
            <div><h1 className="page-title refresh-page-title" role="button" tabIndex={0} title="Click to refresh dashboard" onClick={() => void loadDashboard()} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); void loadDashboard(); } }}>Dashboard</h1><p>{loading ? "Loading dashboard..." : "Overview of your market center."}</p></div>
          </div>
          {message && <div className="unit-message">{message}</div>}

          <section className="dashboard-cards">
            <article className="dashboard-card"><span>Total Units</span><strong>{units.length}</strong><small>{summary.availableUnits} available · {summary.occupiedUnits} occupied</small></article>
            <article className="dashboard-card"><span>Tenants</span><strong>{tenants.length}</strong><small>{summary.activeContracts} active contracts</small></article>
            <article className="dashboard-card"><span>Monthly Income</span><strong>Br {summary.monthlyIncome.toLocaleString()}</strong><small>From paid contracts</small></article>
            <article className="dashboard-card outstanding-card"><span>Outstanding Balance</span><strong>Br {summary.outstanding.toLocaleString()}</strong><small>{summary.pendingItems} pending or overdue item{summary.pendingItems === 1 ? "" : "s"}</small></article>
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-panel">
              <div className="dashboard-panel-heading"><h2>Recent Contracts</h2><span>{contracts.length} total</span></div>
              {recentContracts.length === 0 ? <p className="dashboard-empty">No contracts added yet.</p> : <div className="dashboard-list">{recentContracts.map((contract) => <div className="dashboard-list-row" key={contract._id}><div><strong>{tenantName(contract.tenant)}</strong><small>{contract.paymentFrequency} · Ends {contract.leaseEndDate}</small></div><div className="dashboard-row-value"><strong>Br {contract.amount.toLocaleString()}</strong><span className={`contract-status ${contract.status.toLowerCase()}`}>{contract.status}</span></div></div>)}</div>}
            </article>
            <article className="dashboard-panel">
              <div className="dashboard-panel-heading"><h2>Outstanding Utilities</h2><span>{outstandingUtilities.length} shown</span></div>
              {outstandingUtilities.length === 0 ? <p className="dashboard-empty">No outstanding utility bills.</p> : <div className="dashboard-list">{outstandingUtilities.map((utility) => <div className="dashboard-list-row" key={utility._id}><div><strong>{utility.utilityType} — {unitName(utility.unit)}</strong><small>Due {utility.dueDate}</small></div><div className="dashboard-row-value"><strong>Br {utility.amount.toLocaleString()}</strong><span className={`contract-status ${utility.status.toLowerCase()}`}>{utility.status}</span></div></div>)}</div>}
            </article>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
