import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name="Activivities" />
        <Menu.Item as={NavLink} to='/errors' name="Errors" />
        <Menu.Item>
          <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}