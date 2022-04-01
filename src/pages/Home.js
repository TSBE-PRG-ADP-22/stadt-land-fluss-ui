import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

const Home = () => {
  return (
    <Container>
      <h1>Wilkommen auf Stadt Land Fluss</h1>
      <Row>
        <Col>
          <h2>Spiel Beitreten</h2>
          <InputGroup className="mb-3">
            <FormControl />
            <Button>Jetzt Beitreten</Button>
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h2>Spiel Erstellen</h2>
          <Link to="/create">
            <Button>Jetzt Erstellen</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
