import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { joinGameAPI } from '../api/lobbyAPI';
import useLocalStorage from '../hooks/useLocalStorage';

const Lobby = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [lobby, setLobby] = useLocalStorage('lobby');

  useEffect(() => {
    if (id) {
      joinGameAPI(id).then(({status, data}) => {
        if(status === 200) {
          setLobby(data);
          navigate('/lobby');
        } else {
          window.alert('Ups, etwas ist schiefgelaufen. War sicher das Backend.')
        }
      });
    }
  }, [id]);

  return (
    <Container>
      <h1>Joining game now...</h1>
    </Container>
  );
};

export default Lobby;
