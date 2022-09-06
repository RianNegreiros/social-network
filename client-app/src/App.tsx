import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
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
      <Header as='h2' icon='users' content='Activities' />
      <List>
        {activities.map((activity: any )=> (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))}
      </List>
    </div>
  );
}

export default App;
