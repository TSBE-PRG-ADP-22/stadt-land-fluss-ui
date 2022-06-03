import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Countdown from 'react-countdown';
import { getLobbyConnectionAPI } from '../api/lobbyAPI';
import useLocalStorage from '../hooks/useLocalStorage';

const Game = () => {
  const [currentLetter] = useLocalStorage('currentLetter');
  const [lobby, setLobby] = useLocalStorage('lobby');
  const [isConnected, setIsConnected] = useState(false);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = getLobbyConnectionAPI();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start({ withCredentials: false })
        .then(() => {
          const currentUser = lobby.users.find((user) => user.isCurrentUser);
          if (!isConnected) {
            connection.invoke('join-lobby', currentUser.id, lobby.id);
            setIsConnected(true);
          }
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
  }, [connection, lobby, setLobby, isConnected]);

  const getCountdown = () => {
    const dateTime = new Date();
    dateTime.setMinutes(dateTime.getMinutes()+lobby.timelimit);
    return dateTime;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Spiel</h1>
          <h2>Info</h2>
          <p>
            <b>Runde:</b> {lobby.rounds}
            <br />
            <b>Buchstabe:</b> {currentLetter}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Row className="mb-4">
            <Col className="d-flex flex-column gap-3">
              <h2>Kategorien</h2>
              {lobby.categories.map((category, index) => (
                <Form.Group key={index}>
                  <Form.Label htmlFor={category.name}>{category.name}:</Form.Label>
                  <Form.Control id={category.name} placeholder={`${currentLetter}...`} />
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
        {!!lobby.timelimit && (
          <Col md={4}>
            <h2>Countdown</h2>
            <Countdown date={getCountdown()} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Game;
