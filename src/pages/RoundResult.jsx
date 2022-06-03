import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getLobbyConnectionAPI } from '../api/lobbyAPI';
import useLocalStorage from '../hooks/useLocalStorage';

const RoundResult = () => {
  const [lobby, setLobby] = useLocalStorage('lobby');
  // eslint-disable-next-line no-unused-vars
  const [currentLetter, setCurrentLetter] = useLocalStorage('currentLetter');
  const [usersRound] = useLocalStorage('usersRound');
  const [rankings, setRankings] = useLocalStorage('rankings');
  const [isConnected, setIsConnected] = useState(false);
  const [connection, setConnection] = useState(null);
  const [hasNextRoundStarted, setHasNextRoundStarted] = useState(false);
  const [isCurrentUserReadyForNextRound, setIsCurrentUserReadyForNextRound] = useState(false);

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

          connection.on('round-started', (letter) => {
            setLobby((prevLobby) => ({ ...prevLobby, round: prevLobby.round+1 }));
            setCurrentLetter(letter);
            setHasNextRoundStarted(true);
          });

          connection.on("game-finished", ({ rankings: rankingsArray }) => {
            setRankings(rankingsArray);
          })
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, lobby, isConnected]);

  const onChangeHandler = (e, answer, userId) => {
    connection.invoke(e.target.checked ? 'answer-disliked' : 'answer-liked', JSON.stringify(answer), userId);
  };

  const onNextRoundHandler = () => {
    connection.invoke('user-ready');
    setIsCurrentUserReadyForNextRound(true);
  };

  if (!lobby) {
    return <Navigate to="/" replace />;
  }

  if (hasNextRoundStarted) {
    return <Navigate to="/game" replace />;
  }

  if (!!rankings) {
    return <Navigate to="/results" replace />;
  }

  return (
    <Container>
      <h1>Runde {lobby.round} Ergebnisse</h1>
      <Row className="mb-4">
        <Col>
          <Table striped>
            {lobby.categories.map((category) => (
              <React.Fragment key={category.id}>
                <thead>
                  <tr>
                    <th colSpan={3} style={{ border: 'none' }}>
                      &nbsp;
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={3}>{category.name}</th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>Spieler</th>
                    <th>Antwort</th>
                    <th>Einspruch</th>
                  </tr>
                </thead>
                <tbody>
                  {usersRound.map((userRound, index) => (
                    <tr key={index}>
                      <td>{userRound.user.name}</td>
                      <td>{userRound.answers.find((answer) => answer.category.id === category.id).answer}</td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          label="👎"
                          onChange={(e) =>
                            onChangeHandler(
                              e,
                              userRound.answers.find((answer) => answer.category.id === category.id),
                              userRound.user.id
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </React.Fragment>
            ))}
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          {isCurrentUserReadyForNextRound ? (
            'Andere Spieler sind noch nicht so weit, bitte etwas Geduld...'
          ) : (
            <Button onClick={onNextRoundHandler}>{lobby.rounds === lobby.round ? "Spiel beenden" : "Nächste Runde"}</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RoundResult;
