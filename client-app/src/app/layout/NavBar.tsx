import React from "react";
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
  openForm: () => void;
}

export default function NavBar({openForm}: Props) {
  return (
    <Menu>
      <Container>
        <Menu.Item>
          Activities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={openForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}