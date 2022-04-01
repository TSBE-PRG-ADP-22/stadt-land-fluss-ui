import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Countdown from 'react-countdown';

const Game = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Spiel</h1>
          <h2>Info</h2>
          <p>
            <b>Runde:</b> {2}
            <br />
            <b>Buchstabe:</b> M
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Row className="mb-4">
            <Col className="d-flex flex-column gap-3">
              <h2>Kategorien</h2>
              {['Stadt', 'Land', 'Fluss'].map((category, index) => (
                <Form.Group key={index}>
                  <Form.Label htmlFor="category">{category}:</Form.Label>
                  <Form.Control id="category" placeholder="M..." />
                </Form.Group>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>Fertig</Button>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <h2>Countdown</h2>
          <Countdown date={Date.now() + 100000} />
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
