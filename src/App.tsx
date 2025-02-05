import { useState } from 'react'
import GoogleAuth from './components/GoogleAuth'
import ChatBox from './components/Chatbox'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <div className='min-h-screen flex flex-col items-center p-6'>
      <h1 className='text-3xl font-bold mb-4'>AI Habit Assistant</h1>
      {user ? (
        <div className='w-[33wv] min-w-[400px] p-6 rounded-lg'>
          <p className='text-lg mb-6'>Welcome, {user.name}</p>
          <ChatBox />
        </div>
      ) : (
        <GoogleAuth onSuccess={(userData) => setUser(userData)} />
      )}
    </div>
  );
}

export default App
