import { useState } from 'react'
import './App.css'

// Kezdeti adatok
const initialHelyszinek = [
  { id: 1, nev: 'Várpalota', megyeid: 14 },
  { id: 2, nev: 'Kulcs', megyeid: 13 },
  { id: 3, nev: 'Mosonszolnok', megyeid: 15 },
  { id: 4, nev: 'Mosonmagyaróvár', megyeid: 15 }
];

function App() {
  const [helyszinek, setHelyszinek] = useState(initialHelyszinek);
  const [formData, setFormData] = useState({ id: '', nev: '', megyeid: '' });

  // Űrlap mezők kezelése
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Mentés
  const handleSave = () => {
    if (!formData.nev || !formData.megyeid) {
      alert("A Név és a Megye ID kitöltése kötelező!");
      return;
    }

    if (formData.id) {
      // Frissítés
      setHelyszinek(helyszinek.map(h => 
        h.id === formData.id ? { ...h, nev: formData.nev, megyeid: parseInt(formData.megyeid) } : h
      ));
    } else {
      // Létrehozás
      const newId = helyszinek.length > 0 ? Math.max(...helyszinek.map(h => h.id)) + 1 : 1;
      setHelyszinek([...helyszinek, { id: newId, nev: formData.nev, megyeid: parseInt(formData.megyeid) }]);
    }
    
    // Űrlap ürítése
    setFormData({ id: '', nev: '', megyeid: '' });
  };

  // Betöltés a szerkeztőbe
  const handleEdit = (helyszin) => {
    setFormData(helyszin);
  };

  // Törlés
  const handleDelete = (id) => {
    if (window.confirm("Biztosan törlöd ezt a helyszínt?")) {
      setHelyszinek(helyszinek.filter(h => h.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Helyszín Kezelő (React CRUD)</h2>
      
      {/* Űrlap */}
      <div style={{ marginBottom: '20px', padding: '10px', background: '#e9ecef', borderRadius: '5px' }}>
        <input 
          type="text" 
          name="nev" 
          placeholder="Helyszín neve" 
          value={formData.nev} 
          onChange={handleInputChange} 
          style={{ marginRight: '10px' }}
        />
        <input 
          type="number" 
          name="megyeid" 
          placeholder="Megye ID" 
          value={formData.megyeid} 
          onChange={handleInputChange} 
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSave} style={{ background: '#27ae60', color: 'white', padding: '5px 15px', border: 'none', cursor: 'pointer' }}>
          Mentés
        </button>
      </div>

      {/* Táblázat */}
      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#34495e', color: 'white' }}>
            <th>ID</th>
            <th>Település Név</th>
            <th>Megye ID</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {helyszinek.map((helyszin) => (
            <tr key={helyszin.id}>
              <td>{helyszin.id}</td>
              <td>{helyszin.nev}</td>
              <td>{helyszin.megyeid}</td>
              <td>
                <button onClick={() => handleEdit(helyszin)} style={{ marginRight: '5px' }}>Módosít</button>
                <button onClick={() => handleDelete(helyszin.id)} style={{ color: 'red' }}>Töröl</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App