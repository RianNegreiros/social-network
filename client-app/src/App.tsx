import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {activities.map((activity: any )=> (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
