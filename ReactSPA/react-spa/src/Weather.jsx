import { useState } from 'react';

export default function Weather() {
  const [city, setCity] = useState('Budapest');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    
    try {
      // A wttr.in ingyenes, kulcs nélküli API-ja (format=j1 JSON formátumot ad vissza)
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      if (!response.ok) throw new Error('Nem található a város.');
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Hiba történt az adatok lekérésekor. Próbáld újra!');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#e0f7fa', borderRadius: '8px', color: '#006064' }}>
      <h3>Időjárás Kereső</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Város neve (pl. Budapest)"
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #b2ebf2' }}
        />
        <button onClick={fetchWeather} disabled={loading} style={{ padding: '8px 15px', background: '#00acc1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Keresés...' : 'Lekérdezés'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4>Aktuális időjárás: {weatherData.nearest_area[0].areaName[0].value}</h4>
          <p><strong>Hőmérséklet:</strong> {weatherData.current_condition[0].temp_C} °C</p>
          <p><strong>Páratartalom:</strong> {weatherData.current_condition[0].humidity}%</p>
          <p><strong>Szélsebesség:</strong> {weatherData.current_condition[0].windspeedKmph} km/h</p>
          <p><strong>Állapot:</strong> {weatherData.current_condition[0].weatherDesc[0].value}</p>
        </div>
      )}
    </div>
  );
}