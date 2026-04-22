import { useState } from 'react'
import Weather from './Weather'
import ExpenseTracker from './ExpenseTracker'

function App() {
  const [activeTab, setActiveTab] = useState('weather');

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Egyoldalas Alkalmazás (SPA)</h2>
      
      {/* Alkalmazások közti váltás */}
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setActiveTab('weather')}
          style={{ padding: '10px 20px', background: activeTab === 'weather' ? '#00acc1' : '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🌤️ Időjárás
        </button>
        <button 
          onClick={() => setActiveTab('expense')}
          style={{ padding: '10px 20px', background: activeTab === 'expense' ? '#d81b60' : '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          💰 Költségkövető
        </button>
      </nav>

      {/* Az alkamazások megjelenítésének kiválasztása */}
      <div>
        {activeTab === 'weather' && <Weather />}
        {activeTab === 'expense' && <ExpenseTracker />}
      </div>
    </div>
  )
}

export default App