import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import useLocalStorage from '../hooks/useLocalStorage';

const GameResult = () => {
  const [lobby] = useLocalStorage('lobby');
  const [rankings] = useLocalStorage('rankings');
  const sortedRanking = rankings?.sort((a, b) => a.points - b.points);
  const highestPoints = sortedRanking?.[0]?.points;

  window.localStorage.clear();
  
  if (!rankings) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <h1>Spielauswertung</h1>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-around" style={{ height: '200px' }}>
            {sortedRanking.map((ranking, index) => (
              <div key={index} className="d-flex flex-column justify-content-end align-items-center col-2">
                <div>{index+1}</div>
                <div
                  style={{ height: `calc(${(100 / highestPoints) * ranking.points}% - 48px)` }}
                  className="bg-primary w-100 flex-shrink-0"
                />
                <div>{ranking.user.name}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h2>Rangliste</h2>
          <Table>
            <thead>
              <tr>
                <th>Platz</th>
                <th>Name</th>
                <th>Punkte</th>
              </tr>
            </thead>
            <tbody>
            {sortedRanking.map((ranking, index) => (
              <tr key={index}>
                  <td className="fit">{index+1}</td>
                  <td>{ranking.user.name}</td>
                  <td>{ranking.points}</td>
                </tr>
            ))}
            </tbody>
          </Table>
        </Col>
      </Row>
        <Row>
          <Col>
            {!!lobby.users.find(user => (user.isCurrentUser && user.admin)) ? (
              <Link to="/create">
                <Button>Neue Lobby erstellen</Button>
              </Link>
            ) : (
              <Link to="/">
                <Button>Zurück zur Startseite</Button>
              </Link>
            )}
          </Col>
        </Row>
    </Container>
  );
};

export default GameResult;
