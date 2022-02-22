import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import MyNavBar from '../components/navbar';

function MainTemplate({ children }) {
  return (
    <>
      <MyNavBar />
      <div className="mt-5 pt-5">
        <Container>
          {children}
        </Container>
      </div>
    </>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
