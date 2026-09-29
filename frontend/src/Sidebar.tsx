import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <NavLink to="/dashboard" className="sidebar-brand">
        <h2>Market Center</h2>
      </NavLink>

      <nav>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/units"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Units
        </NavLink>

        <NavLink
          to="/tenants"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Tenants
        </NavLink>

        <NavLink
          to="/contracts"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Contracts
        </NavLink>

        <NavLink
          to="/utilities"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Utilities
        </NavLink>

      

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Reports
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Settings
        </NavLink>

        <NavLink
        style={{backgroundColor:"red"}}
        to="/login"
        className={({isActive})=>
        isActive ? "active" : ""
      }>
      Log out 
      </NavLink>

      </nav>

    </div>
  );
};

export default Sidebar;
