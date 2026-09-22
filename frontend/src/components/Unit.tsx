import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

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
      } else {
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

        <div className="units">

          <h1>Units</h1>

          <form onSubmit={handleSubmit}>

            
            <div className="form-row">

              <div className="input-group">
                

                <input
                  id="unit-id"
                  type="text"
                  placeholder="Unit ID"
                  value={unitId}
                  onChange={(e) =>
                    setUnitId(e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                

                <input
                  id="area"
                  type="number"
                  placeholder="Area"
                  value={area}
                  onChange={(e) =>
                    setArea(e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                

                <input
                  id="type"
                  type="text"
                  placeholder="Type"
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                

                <input
                  id="monthly-rent"
                  type="number"
                  placeholder="Monthly Rent"
                  value={monthlyRent}
                  onChange={(e) =>
                    setMonthlyRent(e.target.value)
                  }
                />
              </div>

              <div className="input-group">
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

            <div className="form-buttons">

              <button id="add-unit" type="submit">
                {editingId
                  ? "Update Unit"
                  : "Add Unit"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

          <h3>{message}</h3>

          <hr />
          

          <h2>Unit List</h2>

          <table>

            <thead>
              <tr>
                <th>Unit ID</th>
                <th>Area</th>
                <th>Type</th>
                <th>Monthly Rent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {units.map((unit) => (
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
                    {unit.status}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleEdit(unit)
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(unit._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
};

export default Units;