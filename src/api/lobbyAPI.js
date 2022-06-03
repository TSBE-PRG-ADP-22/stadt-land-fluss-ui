import fetchy from './fetchy';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const createGameAPI = async (categories, rounds, timelimit) => {
  const { data, status } = await fetchy(`/lobby/`, 'POST', {
    categories,
    rounds,
    timelimit,
  });
  
  // workaround to fix wrong isCurrentUser data from api
  return { data: { ...data, users: [{ ...data.users[0], isCurrentUser: true }], round: 1 }, status };
};

export const joinGameAPI = async (gameId) => {
  const {data, status} = await fetchy(`/lobby/${gameId}/user`, 'POST');
  return { data: { ...data, round: 1 }, status };
};

export const getLobbyConnectionAPI = () =>
  new HubConnectionBuilder().withUrl(`${process.env.REACT_APP_API}/lobby-hub`).withAutomaticReconnect().build();
