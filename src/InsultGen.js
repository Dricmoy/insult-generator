// src/InsultGen.js
import React, { useState } from 'react';
import './InsultGen.css';

const InsultGen = () => {
  const [insult, setInsult] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchInsult = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/insult');
      const data = await response.json();
      setInsult(data.insult);
    } catch (error) {
      console.error('Error fetching insult:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Insult Generator</h1>
      <button className="generate-button" onClick={fetchInsult} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Insult'}
      </button>
      {insult && <p className="insult-text">{insult}</p>}
    </div>
  );
};

export default InsultGen;
