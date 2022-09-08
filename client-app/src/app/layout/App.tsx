import React from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../features/activities/form/ActivityForm';

function App() {
  return (
    <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <Route path='/' component={HomePage} />
          <Route path='/activities' component={ActivityDashboard} />
          <Route path='/createActivity' component={ActivityForm} />
        </Container>
    </>
  );
}

export default observer(App);
