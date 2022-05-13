import fetchy from './fetchy';

export const createGameAPI = async (categories, rounds, timelimit) =>
  fetchy(`/lobby/`, 'POST', {
    categories,
    rounds,
    timelimit,
  });

export const joinGame = async (gameId) => fetchy(`/lobby/${gameId}/user`, 'POST');
