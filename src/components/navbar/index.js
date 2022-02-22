import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MyNavBar() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Link to="/" className="navbar-brand">Frontend-Assesment</Link>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Task 1</Link>
            <Link to="/task-2" className="nav-link">Task 2</Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
