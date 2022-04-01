import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import CategoryToast from '../components/CategoryToast/CategoryToast';

const Create = () => {
  return (
    <Container>
      <Form>
        <h1>Spiel Erstellen</h1>
        <Row className="mb-4">
          <Col>
            <h2>Kategorien</h2>
            <div className="d-flex flex-wrap gap-3 mb-3">
              {['Stadt', 'Land', 'Fluss'].map((category, index) => (
                <CategoryToast key={index} label={category} />
              ))}
            </div>
            <InputGroup>
              <FormControl placeholder="Kategorie z.B. Tier" />
              <Button>Hinzufügen</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h2>Runden</h2>
            <Form.Group>
              <Form.Label htmlFor="rounds">Anzahl Runden:</Form.Label>
              <Form.Control id="rounds" type="number" defaultValue="5" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h2>Zeitlimite</h2>
            <Form.Check type="switch" id="custom-switch" label="Zeitlimite aktivieren" />
            <Form.Group>
              <Form.Label htmlFor="timelimit">Minuten pro Runde:</Form.Label>
              <Form.Control id="timelimit" type="number" defaultValue="3" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>Jetzt Erstellen</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Create;
