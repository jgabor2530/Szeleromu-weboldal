import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [tornyok, setTornyok] = useState([]);
  const [formData, setFormData] = useState({ id: '', darab: '', teljesitmeny: '', kezdev: '', helyszinid: '' });
  
  // Az alap URL, amiben már van egy paraméter (?)
  const apiUrl = 'api.php?table=torony';

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // Gyorsítótárazás megelőzése egy timestamp-pel
      const response = await axios.get(`${apiUrl}&t=${new Date().getTime()}`);
      setTornyok(response.data);
    } catch (error) {
      console.error("Hiba a betöltéskor:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    // 1. Számmá alakítás (Payload előkészítése)
    const payload = {
      ...formData,
      darab: Number(formData.darab),
      teljesitmeny: Number(formData.teljesitmeny),
      kezdev: Number(formData.kezdev),
      helyszinid: Number(formData.helyszinid)
    };

    if (!payload.darab || !payload.teljesitmeny || !payload.helyszinid) {
      return alert("Minden mezőt kötelező kitölteni!");
    }

    try {
      if (formData.id) {
        // SZERKESZTÉS: Itt is érdemes az ID-t az URL-ben is átadni, ha az API úgy várja
        await axios.put(`${apiUrl}&id=${formData.id}`, payload); 
      } else {
        // ÚJ FELVÉTEL: ID törlése, hogy a MySQL generálja (AUTO_INCREMENT)
        const newRecord = { ...payload };
        delete newRecord.id; // Töröljük az id mezőt a másolatból
        await axios.post(apiUrl, newRecord);
      }

      setFormData({ id: '', darab: '', teljesitmeny: '', kezdev: '', helyszinid: '' });
      loadData();
      alert("Sikeres mentés!");
    } catch (error) {
      console.error("Hiba mentéskor:", error);
      alert("Hiba történt a mentés során. Ellenőrizd a konzolt!");
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Biztosan törlöd ezt a tornyot?")) {
      try {
        // JAVÍTÁS: ?id= helyett &id= használata, mert már van ? az URL-ben
        await axios.delete(`${apiUrl}&id=${id}`);
        loadData();
      } catch (error) {
        console.error("Törlési hiba:", error);
        alert("Nem sikerült a törlés.");
      }
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Széltorony Adatbázis</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '10px', 
        marginBottom: '20px', 
        background: '#f1f1f1', 
        padding: '20px', 
        borderRadius: '8px' 
      }}>
        <label>Darab: <input type="number" name="darab" value={formData.darab} onChange={handleInputChange} /></label>
        <label>Teljesítmény: <input type="number" name="teljesitmeny" value={formData.teljesitmeny} onChange={handleInputChange} /></label>
        <label>Év: <input type="number" name="kezdev" value={formData.kezdev} onChange={handleInputChange} /></label>
        <label>Helyszín ID: <input type="number" name="helyszinid" value={formData.helyszinid} onChange={handleInputChange} /></label>
        
<div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
  <button 
    type="button" // <--- EZ A KULCS: megakadályozza az automata submit-ot
    onClick={handleSave} 
    style={{ background: '#27ae60', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
  >
    {formData.id ? 'Módosítás mentése' : 'Új torony hozzáadása'}
  </button>
  {formData.id && (
    <button 
      type="button" // Itt is érdemes megadni
      onClick={() => setFormData({ id: '', darab: '', teljesitmeny: '', kezdev: '', helyszinid: '' })}
    >
      Mégse
    </button>
  )}
</div>
      </div>

      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#34495e', color: 'white' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th>Darab</th>
            <th>Teljesítmény</th>
            <th>Év</th>
            <th>Helyszín ID</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {tornyok.map((t) => (
            <tr key={t.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{t.id}</td>
              <td>{t.darab} db</td>
              <td>{t.teljesitmeny} kW</td>
              <td>{t.kezdev}</td>
              <td>{t.helyszinid}</td>
              <td>
                <button onClick={() => setFormData(t)} style={{ marginRight: '5px' }}>Szerkeszt</button>
                <button onClick={() => handleDelete(t.id)} style={{ marginRight: '5px', color:'red'}}>Töröl</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App