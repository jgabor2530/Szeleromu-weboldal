import { useState } from 'react';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = (e) => {
    e.preventDefault(); // Megakadályozza az oldal újratöltését
    
    if (!name || !amount) return alert('Kérlek töltsd ki mindkét mezőt!');
    
    const newExpense = {
      id: Date.now(), // Egyedi azonosító a listához
      name: name,
      amount: parseFloat(amount)
    };

    setExpenses([...expenses, newExpense]);
    setName('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Dinamikus összegzés
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={{ padding: '20px', background: '#fce4ec', borderRadius: '8px', color: '#880e4f' }}>
      <h3>Költségkövető</h3>
      
      <form onSubmit={handleAddExpense} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Kiadás megnevezése" 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #f8bbd0', flex: 1 }}
        />
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Összeg (Ft)" 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #f8bbd0', width: '120px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', background: '#d81b60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Hozzáadás
        </button>
      </form>

      <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #f8bbd0', paddingBottom: '5px' }}>
          Összes kiadás: {total} Ft
        </h4>
        
        {expenses.length === 0 ? <p>Még nincs felvett kiadás.</p> : (
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {expenses.map((expense) => (
              <li key={expense.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #fce4ec' }}>
                <span>{expense.name}</span>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '15px' }}>{expense.amount} Ft</span>
                  <button onClick={() => handleDelete(expense.id)} style={{ background: 'transparent', color: 'red', border: 'none', cursor: 'pointer' }}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}