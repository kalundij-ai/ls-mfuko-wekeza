import React, { useState } from "react";

export default function PersonCard({ person, spouse, onDelete, onEdit, editingId, onUpdate }) {
  const [editForm, setEditForm] = useState(person);
  const isEditing = editingId === person.id;

  if (isEditing) {
    return (
      <div className={`person-card ${person.gender.toLowerCase()}`}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Clan *</label>
          <input
            type="text"
            value={editForm.clan}
            onChange={(e) => setEditForm({ ...editForm, clan: e.target.value })}
          />
        </div>
        <div className="form-buttons">
          <button className="btn btn-success" onClick={() => onUpdate(person.id, editForm)}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => onEdit(null)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`person-card ${person.gender.toLowerCase()}`}>
      <h3>{person.name}</h3>
      <p><strong>Clan:</strong> {person.clan}</p>
      <p><strong>Gender:</strong> {person.gender}</p>
      {spouse && <p><strong>Spouse:</strong> {spouse.name}</p>}
      
      <div className="card-buttons">
        <button className="btn btn-primary" onClick={() => onEdit(person.id)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(person.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
