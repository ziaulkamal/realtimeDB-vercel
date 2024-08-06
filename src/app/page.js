// src/app/page.js

'use client'; // <-- Tambahkan baris ini

import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    const result = await res.json();
    setResponse(result);
  };

  return (
    <div>
      <h1>Store Data to Firebase Firestore</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Data:
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
