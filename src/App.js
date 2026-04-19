import React, { useState } from "react";
import "./App.css";
import PersonCard from "./components/PersonCard";
import AddMemberForm from "./components/AddMemberForm";
import SearchBar from "./components/SearchBar";
import { members as initialMembers } from "./data";

export default function App() {
  const [data, setData] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClan, setSelectedClan] = useState("");
  const [editingId, setEditingId] = useState(null);

  const clans = [...new Set(data.map(m => m.clan))];

  const getChildren = (parentId) => {
    return data.filter((m) => m.parentId === parentId);
  };

  const getSpouse = (spouseId) => {
    return data.find((m) => m.id === spouseId);
  };

  const addMember = (newMember) => {
    const member = {
      ...newMember,
      id: Date.now().toString()
    };
    setData([...data, member]);
  };

  const deleteMember = (id) => {
    setData(data.filter(m => m.id !== id));
  };

  const updateMember = (id, updatedMember) => {
    setData(data.map(m => m.id === id ? { ...m, ...updatedMember } : m));
    setEditingId(null);
  };

  const filteredData = data.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClan = selectedClan === "" || m.clan === selectedClan;
    return matchesSearch && matchesClan;
  });

  const Tree = ({ parentId }) => {
    const children = getChildren(parentId);
    const displayChildren = children.filter(child => 
      filteredData.some(fm => fm.id === child.id)
    );

    return (
      <div style={{ marginLeft: 20 }}>
        {displayChildren.map((person) => (
          <div key={person.id}>
            <PersonCard 
              person={person} 
              spouse={getSpouse(person.spouseId)}
              onDelete={deleteMember}
              onEdit={setEditingId}
              editingId={editingId}
              onUpdate={updateMember}
            />
            <Tree parentId={person.id} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🌳 LS Mfuko Wekeza - Family Tree</h1>
        <p>Manage and visualize your family genealogy</p>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <AddMemberForm onAdd={addMember} />
        </aside>

        <main className="content">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedClan={selectedClan}
            onClanChange={setSelectedClan}
            clans={clans}
          />

          <div className="stats">
            <p>Total Members: <strong>{data.length}</strong></p>
            <p>Displayed: <strong>{filteredData.length}</strong></p>
          </div>

          <Tree parentId="" />
        </main>
      </div>
    </div>
  );
}
