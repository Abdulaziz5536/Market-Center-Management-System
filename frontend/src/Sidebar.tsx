
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin } from "./utils/auth";

const Sidebar = () => {
  const admin = isAdmin();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "";

  return (
    <>
      <button
        type="button"
        className="mobile-menu-button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <NavLink
          to="/dashboard"
          className="sidebar-brand"
          onClick={closeMenu}
        >
          <h2>Market Center</h2>
        </NavLink>

        <nav className="sidebar-nav">
          <div className="sidebar-main-links">
            <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
              Dashboard
            </NavLink>

            <NavLink to="/units" className={linkClass} onClick={closeMenu}>
              Units
            </NavLink>

            <NavLink to="/tenants" className={linkClass} onClick={closeMenu}>
              Tenants
            </NavLink>

            <NavLink to="/contracts" className={linkClass} onClick={closeMenu}>
              Contracts
            </NavLink>

            <NavLink to="/utilities" className={linkClass} onClick={closeMenu}>
              Utilities
            </NavLink>

            <NavLink
              to="/announcement"
              className={linkClass}
              onClick={closeMenu}
            >
              Announcements
            </NavLink>

            {admin && (
              <NavLink
                to="/settings"
                className={linkClass}
                onClick={closeMenu}
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
    </>
  );
};

export default Sidebar;
