import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { client } from '../tina/__generated__/client'

const TinaWrapper = () => {
  const [tinaData, setTinaData] = useState(null);
  const [error, setError] = useState(null); // Track if it fails

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.queries.page({ relativePath: 'home.md' });
        setTinaData(res);
      } catch (err) {
        console.error("Tina Fetch Error:", err);
        setError(err); // Capture the error
      }
    };
    fetchData();
  }, []);

  // If there's an error, show it so we can fix it!
  if (error) return <div className="text-white p-10 bg-red-900 h-screen">Error: {error.message}</div>;
  
  // If still loading...
  if (!tinaData) return <div className="bg-black h-screen flex items-center justify-center text-white">Loading Overlook Audio...</div>;

  return (
    <App 
      data={tinaData.data} 
      query={tinaData.query} 
      variables={tinaData.variables} 
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TinaWrapper />
  </React.StrictMode>,
)