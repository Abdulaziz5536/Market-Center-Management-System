import { use, useMemo, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {isAdmin} from "../utils/auth";
import { apiFetch } from "../api";
import "../styles.css";

const Units = () => {
  const [units, setUnits] = useState([]);

  const [unitId, setUnitId] = useState("");
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [status, setStatus] = useState("Available");
  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const admin = isAdmin();

 
  const getUnits = async () => {
    try {
      const response = await apiFetch("/units");

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        console.error(data.message);
        return;
      }

      setUnits(data.units);
    } catch (error) {
      console.error("Error getting units:", error);
      setMessage("Unable to load units");
    }
  };

  
  useEffect(() => {
    getUnits();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const unitData = {
      unitId,
      area: Number(area),
      type,
      monthlyRent: Number(monthlyRent),
      status,
    };

    try {
      let response;

     
      if (editingId) {
        response = await apiFetch(`/units/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(unitData),
          }
        );
      }

      
      else {
        response = await apiFetch("/units",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(unitData),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        console.error(data.message);
        return;
      }

      setMessage(data.message);

      clearForm();

      getUnits();
    } catch (error) {
      console.error("Error saving unit:", error);
      setMessage("Unable to save unit");
    }
  };

 
  const handleEdit = (unit) => {
    setEditingId(unit._id);

    setUnitId(unit.unitId);
    setArea(unit.area);
    setType(unit.type);
    setMonthlyRent(unit.monthlyRent);
    setStatus(unit.status);

    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this unit?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await apiFetch(
        `/units/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        console.error(data.message);
        return;
      }

      setMessage(data.message);

      getUnits();
    } catch (error) {
      console.error("Error deleting unit:", error);
      setMessage("Unable to delete unit");
    }
  };

  
  const clearForm = () => {
    setUnitId("");
    setArea("");
    setType("");
    setMonthlyRent("");
    setStatus("Available");
    setEditingId(null);
  };

    const filteredUnits = useMemo(() => {
      const searchTerm = search.toLowerCase();
      return units.filter((unit) => {
        const name = typeof unit.unitId === "string" ? unit.unitId : unit.unitId?.type;
        return name?.toLowerCase().includes(searchTerm);
      });
    }, [units, search]);

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="page-content">

        <div className="units-page">

          
          <h1
            className="page-title refresh-page-title"
            role="button"
            tabIndex={0}
            title="Click to refresh units"
            onClick={() => void getUnits()}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                void getUnits();
              }
            }}
          >
            Units
          </h1>

          
         {admin && ( <section className="unit-form-card">

            <h2>
              {editingId ? "Edit Unit" : "Add Unit"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="unit-form-row">

                
                <div className="unit-field">

                  <label htmlFor="unit-id">
                    Unit ID
                  </label>

                  <input
                    id="unit-id"
                    type="text"
                    placeholder="Enter unit ID"
                    value={unitId}
                    onChange={(e) =>
                      setUnitId(e.target.value)
                    }
                  />

                </div>

                
                <div className="unit-field">

                  <label htmlFor="area">
                    Area m/s²
                  </label>

                  <input
                    id="area"
                    type="number"
                    placeholder="Enter area"
                    value={area}
                    onChange={(e) =>
                      setArea(e.target.value)
                    }
                  />

                </div>

                
                <div className="unit-field">

                  <label htmlFor="type">
                    Type
                  </label>

                  <input
                    id="type"
                    type="text"
                    placeholder="Enter unit type"
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value)
                    }
                  />

                </div>

               
                <div className="unit-field">

                  <label htmlFor="monthly-rent">
                    Monthly Rent Amount (Br)
                  </label>

                  <input
                    id="monthly-rent"
                    type="number"
                    placeholder="Enter monthly rent"
                    value={monthlyRent}
                    onChange={(e) =>
                      setMonthlyRent(e.target.value)
                    }
                  />

                </div>

                
                <div className="unit-field">

                  <label htmlFor="status">
                    Status
                  </label>

                  <select
                    id="status"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                  >

                    <option value="Available">
                      Available
                    </option>

                    <option value="Occupied">
                      Occupied
                    </option>

                  </select>

                </div>

              </div>

              
              <div className="unit-form-buttons">

           {admin && (     <button
                  type="submit"
                  className="add-unit-button"
                >
                  {editingId
                    ? "Update Unit"
                    : "Add Unit"}
                </button> )}

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

          </section> )}

          
          {message && (
            <div className="unit-message">
              {message}
            </div>
          )}

          
          <section className="unit-list-card">

            <h2>
              Units List
            </h2>

            <input className="unit-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search units..." />

            <div className="unit-table-wrapper">

              <table className="units-table">

                <thead>

                  <tr>

                    <th>
                      UNIT ID
                    </th>

                    <th>
                      AREA
                    </th>

                    <th>
                      TYPE
                    </th>

                    <th>
                      MONTHLY RENT
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th>
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUnits.length === 0 ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="no-units"
                      >
                        No units found
                      </td>

                    </tr>

                  ) : (

                    filteredUnits.map((unit) => (

                      <tr key={unit._id}>

                        <td>
                          {unit.unitId}
                        </td>

                        <td>
                          {unit.area}
                        </td>

                        <td>
                          {unit.type}
                        </td>

                        <td>
                          {unit.monthlyRent}
                        </td>

                        <td>

                          <span
                            className={
                              unit.status === "Available"
                                ? "status-badge available"
                                : "status-badge occupied"
                            }
                          >
                            {unit.status.toLowerCase()}
                          </span>

                        </td>

                        <td>

                         <div className="unit-actions">

                            { admin && (<button
                              className="edit-button"
                              onClick={() =>
                                handleEdit(unit)
                              }
                            >
                              Edit
                            </button> )}

                        {admin && (    <button
                              className="delete-button"
                              onClick={() =>
                                handleDelete(unit._id)
                              }
                            >
                              Delete
                            </button>  )}

                          </div> 

                        </td>

                      </tr>

                    ))

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

export default Units;
