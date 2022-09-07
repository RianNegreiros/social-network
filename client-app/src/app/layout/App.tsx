import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';
import { Activity } from '../models/activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities").then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <div className="App">
      <Header as='h2' icon='users' content='Activities' />
      <List>
        {activities.map(activity => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))}
      </List>
    </div>
  );
}

export default App;
