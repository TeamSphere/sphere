import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    // Make an API request to the backend to generate code
    axios.get('/api/generate-code')
      .then(response => {
        setGeneratedCode(response.data.generatedCode);
      })
      .catch(error => {
        console.error('Error generating code:', error);
      });
  }, []);

  return (
    <div>
      <h1>Generated Code:</h1>
      <pre>{generatedCode}</pre>
    </div>
  );
}

export default Home;