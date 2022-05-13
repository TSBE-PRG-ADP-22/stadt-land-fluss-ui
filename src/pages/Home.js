import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { joinGame } from '../api/lobbyAPI';
import useLocalStorage from '../hooks/useLocalStorage';

const Home = () => {
  const navigate = useNavigate();

  const [gameId, setGameId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [lobby, setLobby] = useLocalStorage('lobby');

  const joinGameHandler = () => {
    joinGame(gameId).then(({status, data}) => {
      if(status === 200) {
        setLobby(data);
        navigate('/lobby');
      } else {
        window.alert('Ups, etwas ist schiefgelaufen. War sicher das Backend.')
      }
    });
  };

  return (
    <Container>
      <h1>Wilkommen auf Stadt Land Fluss</h1>
      <Row>
        <Col>
          <h2>Spiel Beitreten</h2>
          <InputGroup className="mb-3">
            <FormControl placeholder='z.B. fd021ce6' value={gameId} onChange={(e) => setGameId(e.target.value)} />
            <Button onClick={joinGameHandler}>Jetzt Beitreten</Button>
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
