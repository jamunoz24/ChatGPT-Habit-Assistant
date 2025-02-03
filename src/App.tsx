import { useState } from 'react'
import GoogleAuth from './components/GoogleAuth'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <div>
      <h1>Habit Tracker</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
        </div>
      ) : (
        <GoogleAuth onSuccess={(userData) => setUser(userData)} />
      )}
    </div>
  );
}

export default App
