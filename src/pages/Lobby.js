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
          console.log('currentUser', currentUser);

          connection.on('user-added', (invokedUser) => {
            console.log('user-added');
            console.log('invokedUser', invokedUser);
            if (!lobby.users.some((user) => user.id === invokedUser.id)) {
              // const users = [...lobby.users];
              // users.push(invokedUser);
              // setLobby({ ...lobby, users });
              setNewUser(invokedUser)
            }
            console.log('==============');
          });

          connection.on('game-start', (message) => {
            return <Navigate to="/game" />;
          });
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
  }, [connection, lobby, setLobby, isConnected]);

  useEffect(() => {
    console.log('LOBBY', lobby);
    console.log('==========================');
  }, [lobby]);

  useEffect(() => {
    if (newUser) {
      setLobby({ ...lobby, users: [ ...lobby.users, newUser ] });
    }
  }, [newUser]);

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
            <Button>Jetzt Spielen</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Lobby;
