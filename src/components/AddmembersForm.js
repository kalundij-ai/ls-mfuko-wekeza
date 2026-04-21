import React, { useState } from "react";

export default function AddMemberForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    clan: "",
    gender: "Male",
    parentId: "",
    spouseId: "",
    birthDate: "",
    photo: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.clan) {
      alert("Name and Clan are required!");
      return;
    }
    onAdd(form);
    setForm({
      name: "",
      clan: "",
      gender: "Male",
      parentId: "",
      spouseId: "",
      birthDate: "",
      photo: ""
    });
    alert("Member added successfully!");
  };

  return (
    <div>
      <h2>➕ Add New Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Clan *</label>
          <input
            type="text"
            value={form.clan}
            onChange={(e) => setForm({ ...form, clan: e.target.value })}
            placeholder="Clan name"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Birth Date</label>
          <input
            type="date"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            ➕ Add Member
          </button>
        </div>
      </form>
    </div>
  );
}
