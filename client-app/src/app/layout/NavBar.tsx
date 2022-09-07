import React from "react";
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
  return (
    <Menu>
      <Container>
        <Menu.Item>
          Activities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}