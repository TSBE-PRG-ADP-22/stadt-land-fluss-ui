import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const GameResult = () => {
  const highestPoints = 120;
  return (
    <Container>
      <h1>Spielauswertung</h1>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-around" style={{ height: '200px' }}>
            {[
              { position: 1, name: 'Kieran', points: 120 },
              { position: 2, name: 'Jan', points: 100 },
              { position: 3, name: 'Björn', points: 80 },
            ].map((player, index) => (
              <div key={index} className="d-flex flex-column justify-content-end align-items-center col-2">
                <div>{player.position}</div>
                <div
                  style={{ height: `calc(${(100 / highestPoints) * player.points}% - 48px)` }}
                  className="bg-primary w-100 flex-shrink-0"
                />
                <div>{player.name}</div>
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
              {[
                { position: 1, name: 'Kieran', points: 420 },
                { position: 2, name: 'Jan', points: 69 },
                { position: 3, name: 'Björn', points: 42 },
              ].map((player, index) => (
                <tr key={index}>
                  <td className="fit">{player.position}</td>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>Nochmal Spielen</Button> <Button>Neue Lobby erstellen</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GameResult;
