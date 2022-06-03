import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getLobbyConnectionAPI } from '../api/lobbyAPI';
import useLocalStorage from '../hooks/useLocalStorage';

const Lobby = () => {
  const [lobby, setLobby] = useLocalStorage('lobby');
  const [isConnected, setIsConnected] = useState(false);
  const [connection, setConnection] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [hasGameStarted, setHasGameStarted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentLetter, setCurrentLetter] = useLocalStorage('currentLetter');

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

          connection.on('user-added', (invokedUser) => {
            if (!lobby.users.some((user) => user.id === invokedUser.id)) {
              setNewUser(invokedUser)
            }
          });

          connection.on('round-started', (letter) => {
            setCurrentLetter(letter)
            setHasGameStarted(true);
          });
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, lobby, setLobby, isConnected]);

  useEffect(() => {
    if (newUser && newUser.id) {
      setLobby({ ...lobby, users: [ ...lobby.users, newUser ] });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  const onStartGameHandler = () => {
    if (connection) {
      connection.invoke('game-start');
    }
  }

  if (hasGameStarted) {
    return <Navigate to="/game" />;
  }

  return (
    <Container>
      <h1>Lobby</h1>
      <Row className="mb-4">
        <Col>
          <h2>Einladen</h2>
          <InputGroup className="mb-3" id="gameLink">
            <FormControl defaultValue={`${process.env.REACT_APP_FE}/lobby/${lobby.id}`} disabled />
            <Button onClick={() => navigator.clipboard.writeText(`${process.env.REACT_APP_FE}/lobby/${lobby.id}`)}>
              Kopieren
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h2>Spieler</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {lobby.users.map((player, index) => (
                <tr key={index}>
                  <td className={player.isCurrentUser ? 'bg-info bg-opacity-25 fw-bold' : ''}>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          {!!lobby.users.find(user => (user.isCurrentUser && user.admin)) && (
            <Button onClick={onStartGameHandler}>Jetzt Spielen</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Lobby;
