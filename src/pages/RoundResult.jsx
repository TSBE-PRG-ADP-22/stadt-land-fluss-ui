import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const RoundResult = () => {
  return (
    <Container>
      <h1>Runde {2} Ergebnisse</h1>
      <Row className="mb-4">
        <Col>
          <Table striped>
            {[
              {
                name: 'Stadt',
                results: [
                  { name: 'Kieran', answer: 'Malibu' },
                  { name: 'Jan', answer: 'Madrid' },
                  { name: 'Björn', answer: 'Mexico City' },
                ],
              },
              {
                name: 'Land',
                results: [
                  { name: 'Kieran', answer: 'Monacco' },
                  { name: 'Jan', answer: 'Malta' },
                  { name: 'Björn', answer: '' },
                ],
              },
              {
                name: 'Fluss',
                results: [
                  { name: 'Kieran', answer: 'Mississipi' },
                  { name: 'Jan', answer: 'Maja' },
                  { name: 'Björn', answer: 'Mekong' },
                ],
              },
            ].map((category, index) => (
              <React.Fragment key={index}>
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
                  {category.results.map((player, index) => (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td>{player.answer}</td>
                      <td>
                        <Form.Check type="checkbox" label="👎" />
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
          <Button>Nächste Runde</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RoundResult;
