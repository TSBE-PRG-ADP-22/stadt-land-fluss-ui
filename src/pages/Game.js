import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [usersRound, setUsersRound] = useLocalStorage('usersRound');

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

          connection.on('round-finished', (letter) => {
            const answers = Array.from(document.getElementById('gameValues').getElementsByTagName('INPUT')).map(
              (input) => ({
                key: letter,
                category: lobby.categories.find((category) => category.name === input.id),
                answer: input.value,
              })
            );
            connection.invoke('user-round-data', JSON.stringify(answers));
          });
    
          connection.on('round-info', (roundResults) => {
            setUsersRound(roundResults)
            setIsRoundFinished(true);
          });
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, lobby, setLobby, isConnected]);

  const getCountdown = () => {
    const dateTime = new Date();
    dateTime.setMinutes(dateTime.getMinutes() + lobby.timelimit);
    return dateTime;
  };

  const onRoundFinishedHandler = () => {
    if (connection) {
      connection.invoke('round-finished', currentLetter);
    }
  };

  if (isRoundFinished) {
    return <Navigate to="/round-result" replace />;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Spiel</h1>
          <h2>Info</h2>
          <p>
            <b>Runde:</b> {lobby.round} / {lobby.rounds}
            <br />
            <b>Buchstabe:</b> {currentLetter}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Row className="mb-4">
            <Col className="d-flex flex-column gap-3" id="gameValues">
              <h2>Kategorien</h2>
              {lobby.categories.map((category, index) => (
                <Form.Group key={index}>
                  <Form.Label htmlFor={category.name}>{category.name}:</Form.Label>
                  <Form.Control
                    id={category.name}
                    placeholder={`${currentLetter}...`}
                  />
                </Form.Group>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={onRoundFinishedHandler}>Fertig</Button>
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
