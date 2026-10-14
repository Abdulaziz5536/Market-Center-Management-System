
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAdmin } from "./utils/auth";
import LanguageSelector from "./LanguageSelector";

const Sidebar = () => {
  const admin = isAdmin();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
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
          <h2>{t("appName")}</h2>
        </NavLink>

        <nav className="sidebar-nav">
          <div className="sidebar-main-links">
            <NavLink
              to="/dashboard"
              className={linkClass}
              onClick={closeMenu}
            >
              {t("navigation.dashboard")}
            </NavLink>

            <NavLink
              to="/units"
              className={linkClass}
              onClick={closeMenu}
            >
              {t("navigation.units")}
            </NavLink>

            <NavLink
              to="/tenants"
              className={linkClass}
              onClick={closeMenu}
            >
              {t("navigation.tenants")}
            </NavLink>

            <NavLink
              to="/contracts"
              className={linkClass}
              onClick={closeMenu}
            >
              {t("navigation.contracts")}
            </NavLink>

            <NavLink
              to="/utilities"
              className={linkClass}
              onClick={closeMenu}
            >
              {t("navigation.utilities")}
            </NavLink>

            <NavLink
              to="/announcement"
              className={linkClass}
              onClick={closeMenu}
            >
              {t("navigation.announcements")}
            </NavLink>

            {admin && (
              <NavLink
                to="/settings"
                className={linkClass}
                onClick={closeMenu}
              >
                {t("navigation.settings")}
              </NavLink>
            )}
          </div>

          <div className="sidebar-bottom-links">
            <LanguageSelector />

            <button
              type="button"
              className="sidebar-logout"
              onClick={handleLogout}
            >
              <span className="logout-icon">↪</span>
              {t("navigation.logout")}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
