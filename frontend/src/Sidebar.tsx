import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin } from "./utils/auth";

const Sidebar = () => {
const admin = isAdmin();
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login", { replace: true });
};

return ( <aside className="sidebar"> <NavLink to="/dashboard" className="sidebar-brand"> <h2>Market Center</h2> </NavLink>


  <nav className="sidebar-nav">
    <div className="sidebar-main-links">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/units"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Units
      </NavLink>

      <NavLink
        to="/tenants"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Tenants
      </NavLink>

      <NavLink
        to="/contracts"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Contracts
      </NavLink>

      <NavLink
        to="/utilities"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Utilities
      </NavLink>

      <NavLink
        to="/announcement"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Announcements
      </NavLink>

      {admin && (
        <NavLink
          to="/settings"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Settings
        </NavLink>
      )}
    </div>

    <div className="sidebar-bottom-links">
      <button
        type="button"
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <span className="logout-icon">↪</span>
        Log out
      </button>
    </div>
  </nav>
</aside>


);
};

export default Sidebar;
