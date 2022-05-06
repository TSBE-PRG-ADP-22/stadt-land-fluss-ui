import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Navigate } from 'react-router-dom';

const Lobby = () => {
  const [gameLink] = useState("https://foo.bar/lobby/xyz")

  const [ connection, setConnection ] = useState(null);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://stadt-land-fluss-api.herokuapp.com')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
        connection.start()
            .then(() => {
                console.log('Connected!');

                connection.on('user-added', message => {
                  // add user to list
                });

                connection.on('game-start', message => {
                  return <Navigate to='/game' />
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  return (
    <Container>
      <h1>Lobby</h1>
      <Row className="mb-4">
        <Col>
          <h2>Einladen</h2>
          <InputGroup className="mb-3" id="gameLink">
            <FormControl defaultValue={gameLink} disabled />
            <Button onClick={() =>  navigator.clipboard.writeText(gameLink)}>Kopieren</Button>
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
              {/* TODO: Map real players */}
              {['Kieran', 'Jan', 'Björn'].map((player, index) => (
                <tr key={index}>
                  <td>{player}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* TODO: Button only visible for admin */}
          <Button>Jetzt Spielen</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Lobby;
