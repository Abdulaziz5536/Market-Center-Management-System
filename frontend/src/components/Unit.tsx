import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "../styles.css";

const Units = () => {
  const [units, setUnits] = useState([]);

  const [unitId, setUnitId] = useState("");
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [status, setStatus] = useState("Available");

  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

 
  const getUnits = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/units"
      );

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
        response = await fetch(
          `http://localhost:5000/units/${editingId}`,
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
        response = await fetch(
          "http://localhost:5000/units",
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
      const response = await fetch(
        `http://localhost:5000/units/${id}`,
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

  // CLEAR FORM
  const clearForm = () => {
    setUnitId("");
    setArea("");
    setType("");
    setMonthlyRent("");
    setStatus("Available");
    setEditingId(null);
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="page-content">

        <div className="units-page">

          
          <h1 className="page-title">
            Units
          </h1>

          
          <section className="unit-form-card">

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
                    Monthly Rent
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

                <button
                  type="submit"
                  className="add-unit-button"
                >
                  {editingId
                    ? "Update Unit"
                    : "Add Unit"}
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

          </section>

          
          {message && (
            <div className="unit-message">
              {message}
            </div>
          )}

          
          <section className="unit-list-card">

            <h2>
              Units List
            </h2>

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

                  {units.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="no-units"
                      >
                        No units found
                      </td>

                    </tr>

                  ) : (

                    units.map((unit) => (

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
                            {unit.status}
                          </span>

                        </td>

                        <td>

                          <div className="unit-actions">

                            <button
                              className="edit-button"
                              onClick={() =>
                                handleEdit(unit)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-button"
                              onClick={() =>
                                handleDelete(unit._id)
                              }
                            >
                              Delete
                            </button>

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