import React from "react";
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from "../stores/store";

export default function NavBar() {
  const {activityStore} = useStore();

  return (
    <Menu>
      <Container>
        <Menu.Item>
          Activities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}