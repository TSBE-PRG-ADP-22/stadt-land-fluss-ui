import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { createGameAPI } from '../api/lobbyAPI';
import useLocalStorage from '../hooks/useLocalStorage';
import CategoryToast from '../components/CategoryToast/CategoryToast';

const Create = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [lobby, setLobby] = useLocalStorage('lobby');

  const [categories, setCategories] = useState(['Stadt', 'Land', 'Fluss']);
  const [categoryInput, setCategoryInput] = useState('');

  const [roundsInput, setRoundsInput] = useState('5');

  const [isTimeLimitActive, setIsTimeLimitActive] = useState(false);
  const [timeLimitInput, setTimeLimitInput] = useState('3');

  const addCategory = () => {
    setCategories((prevState) => [...prevState, categoryInput]);
    setCategoryInput('');
  };

  const createGameHandler = () => {
    createGameAPI(
      categories.map((category) => ({ name: category })),
      roundsInput,
      timeLimitInput
    )
      .then(({status, data}) => {
        if (status === 200) {
          setLobby(data);
          navigate('/lobby', { replace: true });
        } else {
          window.alert('Ups, etwas ist schiefgelaufen. War sicher das Backend.')
        }
      })
  };

  return (
    <Container>
      <Form>
        <h1>Spiel Erstellen</h1>
        <Row className="mb-4">
          <Col>
            <h2>Kategorien</h2>
            <div className="d-flex flex-wrap gap-3 mb-3">
              {categories.map((category, index) => (
                <CategoryToast
                  key={index}
                  label={category}
                  onClose={() => setCategories((prevState) => [...prevState].filter((cat) => cat !== category))}
                />
              ))}
            </div>
            <InputGroup>
              <FormControl
                placeholder="Kategorie z.B. Tier"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              />
              <Button onClick={addCategory}>Hinzufügen</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h2>Runden</h2>
            <Form.Group>
              <Form.Label htmlFor="rounds">Anzahl Runden:</Form.Label>
              <Form.Control
                id="rounds"
                type="number"
                value={roundsInput}
                onChange={(e) => setRoundsInput(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h2>Zeitlimite</h2>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Zeitlimite aktivieren"
              onClick={() => setIsTimeLimitActive(!isTimeLimitActive)}
            />
            {isTimeLimitActive && (
              <Form.Group id="timelimitvlaues">
                <Form.Label htmlFor="timelimit">Minuten pro Runde:</Form.Label>
                <Form.Control
                  id="timelimit"
                  type="number"
                  value={timeLimitInput}
                  onChange={(e) => setTimeLimitInput(e.target.value)}
                />
              </Form.Group>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={createGameHandler}>Jetzt Erstellen</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default Create;
