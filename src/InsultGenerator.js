import React, { useState } from 'react';
import { Container, Button, Typography, CircularProgress } from '@mui/material';

const InsultGenerator = () => {
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
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Insult Generator
      </Typography>
      <Button variant="contained" color="primary" onClick={fetchInsult} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Generate Insult'}
      </Button>
      {insult && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          {insult}
        </Typography>
      )}
    </Container>
  );
};

export default InsultGenerator;
