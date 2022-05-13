import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { HubConnectionBuilder } from "@microsoft/signalr";
import useLocalStorage from '../hooks/useLocalStorage';

const Lobby = () => {
  const [lobby] = useLocalStorage('lobby');
  console.log('lobby', lobby);

  const [ connection, setConnection ] = useState(null);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API}/lobby-hub`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
        connection.start({ withCredentials: false })
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
            <FormControl defaultValue={`${process.env.REACT_APP_FE}/lobby/${lobby.id}`} disabled />
            <Button onClick={() =>  navigator.clipboard.writeText(`${process.env.REACT_APP_FE}/lobby/${lobby.id}`)}>Kopieren</Button>
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
