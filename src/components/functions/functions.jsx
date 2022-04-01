export const getPlayers = (e, numberOfPlayers) => {
  e.preventDefault();
  const newPlayers = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    const newPlayer = {
      name: "",
      playerIndex: i,
      skills: 0,
      points: 0,
    };
    newPlayers.push(newPlayer);
    //console.table(newPlayers);
  }
  return newPlayers;
};

// const changePlayerSkills = (playerId, playerSkills) => {
//   const playersCopy = [...players];
//   const playerToChange = playersCopy.find((player) => player.playerIndex === playerId);
//   playerToChange.skills = playerSkills;
//   setPlayers(playersCopy);
// };

export function back(page) {
  return page - 1;
}

export function mainPage() {
  return 0;
}

export function getNumberOfPlayers(e) {
  return e.target.value;
}

export const matchResult = (e, id, matchesState) => {
  console.log("matchesState", matchesState);
  if (e.target.value !== "") {
    const matchesCopy = [...matchesState];
    const pointsToPush = parseInt(e.target.value);
    const playersScoring = matchesCopy.find((match) => match.id === id);
    playersScoring.teams[0].points = pointsToPush;
    return matchesCopy;
  } else {
    return matchesState;
  }
};

export const sortPlayers = (players) => {
  const sorted = [...players].sort((a, b) => {
    return b.points - a.points;
  });
  return sorted;
  // setPlayers(sorted);
};

export const matchResult2 = (e, id, matchesState) => {
  if (e.target.value !== "") {
    const matchesCopy = [...matchesState];
    const pointsToPush = parseInt(e.target.value);
    const playersScoring = matchesCopy.find((match) => match.id === id);
    playersScoring.teams[1].points = pointsToPush;
    return matchesCopy;
    //setMatches(matchesCopy);
  } else {
    return matchesState;
  }
};

export function generateMatch(players) {
  //setEstado(2);
  const teams = [];
  //1-juntando jugador con jugador
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players.length; j++) {
      if (i === j) {
        continue;
      }
      const team = [players[j], players[i]];
      teams.push(team);
    }
  }
  ////2-despues eliminar los que coincindan
  for (let i = 0; i < teams.length; i++) {
    const player1 = teams[i][0];
    const player2 = teams[i][1];
    ///mirar si es necesario o lo puedo quitar/////////////////////////////////////////////////////////////////////
    for (let j = 0; j < teams.length; j++) {
      if (i === j) {
        continue;
      }
      if (player1 === teams[j][1] && player2 === teams[j][0]) {
        if (i < j) {
          teams.splice(j, 1);
        }
        break;
      }
    }
  }
  //   // 3-matches de 2 vs 2 con repetidos
  /////refactorizar de manera que en este paso no meta los partidos que sean iguales////////////////////////
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams.length; j++) {
      if (i === j) {
        continue;
      }
      const matchTeams = [
        { members: teams[j], points: 0 },
        { members: teams[i], points: 0 },
      ];
      matches.push({
        teams: matchTeams,
        id: `${i}${j}`,
      });
    }
  }
  // 4-matches de 2 vs 2 sin jugadores jugando en dos equipos a la vez
  for (let i = 0; i < matches.length; i++) {
    const element1 = matches[i].teams[0].members[0];
    const element2 = matches[i].teams[0].members[1];

    if (
      element1 === matches[i].teams[1].members[1] ||
      element1 === matches[i].teams[1].members[0] ||
      element2 === matches[i].teams[1].members[0] ||
      element2 === matches[i].teams[1].members[1]
    ) {
      matches.splice(i, 1);
      i = i - 1;
    }
  }
  ///////////////////////////////////////////////////////////////
  for (let i = 0; i < matches.length; i++) {
    const player1 = matches[i].teams[0].members[0].name;
    const player2 = matches[i].teams[0].members[1].name;
    for (let j = 0; j < matches.length; j++) {
      if (i === j) {
        continue;
      }
      if (
        player1 === matches[j].teams[1].members[0].name &&
        player2 === matches[j].teams[1].members[1].name
      ) {
        matches.splice(j, 1);
        j = j - 1;
        break;
      }
    }
  }
  return matches;
}

export const setPlayerName = (e, playerId, playerName, players) => {
  const playersCopy = [...players];

  const playerToChange = playersCopy.find(
    (player) => player.playerIndex === playerId
  );
  playerToChange.name = playerName;
  return playersCopy; // porque no es es playerToChange;
};

// const sliderChange = (e) => {
//   setSensibility(e.target.value);
// };

export function totalEachPlayersPoints(id, matchesState, players) {
  console.log("id", id);
  console.log("matchesState", matchesState);
  console.log("players111", players);
  const playersCopy = [...players];
  const teamsMappedFromMatches = [...matchesState]
    .map((match) => match.teams)
    .flat();
  const pointList = teamsMappedFromMatches
    .filter((team) => team.members.some((member) => member.id === id))
    .map((team) => team.points);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const pointReduced = pointList.reduce(reducer);
  playersCopy.forEach((player) => {
    if (player.id === id) {
      player.points = pointReduced;
    }
  });
  console.log("players", playersCopy);
  console.log("pointReduced", pointReduced);
  return pointReduced;
}
