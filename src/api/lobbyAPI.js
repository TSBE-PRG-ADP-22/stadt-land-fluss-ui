import fetchy from './fetchy';

const createGameAPI = async(gameId, [categories], rounds, timelimit, status) =>
  fetchy(`/lobby/`, 'POST', {
    id,
    categories: [categories],
    rounds,
    timelimit,
    status
  });
const joinGame = async(gameId, name) =>
  fetchy(`/lobby/${id}/user`, 'POST', {
    id,
    name
  });