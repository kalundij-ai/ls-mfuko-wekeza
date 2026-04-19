import React from "react";

export default function SearchBar({ searchTerm, onSearchChange, selectedClan, onClanChange, clans }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={selectedClan} onChange={(e) => onClanChange(e.target.value)}>
        <option value="">All Clans</option>
        {clans.map((clan) => (
          <option key={clan} value={clan}>
            {clan}
          </option>
        ))}
      </select>
    </div>
  );
}