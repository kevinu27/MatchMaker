import "./Main.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Header } from "../Header/Header";
import { NumberOfPlayersInput } from "../NumberOfPLayers/NumberOfPLayers";
import { NameAndSkills } from "../NameAndSkills/NameAndSkills";
import { Matches } from "../Matches/Matches";

export function Main(props) {
  const [sensibility, setSensibility] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [players, setPlayers] = useState([]);
  const [estado, setEstado] = useState(0);
  const [matchesState, setMatches] = useState([]);

  const funcionDeClick = (e) => {
    e.preventDefault();
    setEstado("iniciado");

    const newPlayers = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      const newPlayer = {
        name: "",
        id: i,
        skills: 0,
        points: 0,
      };
      newPlayers.push(newPlayer);
    }
    setPlayers(newPlayers);
    setEstado(1);
  };
  const changePlayerSkills = (playerId, playerSkills) => {
    const playersCopy = [...players];
    const playerToChange = playersCopy.find((player) => player.id === playerId);
    playerToChange.skills = playerSkills;
    setPlayers(playersCopy);
  };

  function back() {
    setEstado(estado - 1);
  }
  function inicio() {
    setEstado(0);
  }

  function getNumberOfPlayers(event) {
    setNumberOfPlayers(event.target.value);
  }

  const matchResult = (e, id) => {
    if (e.target.value !== "") {
      const matchesCopy = [...matchesState];
      const pointsToPush = parseInt(e.target.value);
      const playersScoring = matchesCopy.find((match) => match.id === id);
      playersScoring.teams[0].points = pointsToPush;
      setMatches(matchesCopy);
    }
  };

  const sortPlayers = () => {
    const sorted = [...players].sort((a, b) => {
      return b.points - a.points;
    });
    setPlayers(sorted);
  };

  const matchResult2 = (e, id) => {
    if (e.target.value !== "") {
      const matchesCopy = [...matchesState];
      const pointsToPush = parseInt(e.target.value);
      const playersScoring = matchesCopy.find((match) => match.id === id);
      playersScoring.teams[1].points = pointsToPush;
      setMatches(matchesCopy);
    }
  };

  function generateMatch(players) {
    setEstado(2);
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
    setMatches(matches);
  }

  const setPlayerName = (playerId, playerName) => {
    const playersCopy = [...players];
    const playerToChange = playersCopy.find((player) => player.id === playerId);
    playerToChange.name = playerName;
    setPlayers(playersCopy);
  };

  const sliderChange = (e) => {
    setSensibility(e.target.value);
  };

  function totalEachPlayersPoints(id) {
    // quiero filtrar los partidos donde participa un jugador
    const teamsMappedFromMatches = matchesState
      .map((match) => match.teams)
      .flat();
    const pointList = teamsMappedFromMatches
      .filter((team) => team.members.some((member) => member.id === id))
      .map((team) => team.points);
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    const pointReduced = pointList.reduce(reducer);
    players.forEach((player) => {
      if (player.id === id) {
        player.points = pointReduced;
      }
    });
    return pointReduced;
  }
  //////////////////////////////////////////////////////////////////////////////////////Return/////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Header back={back} inicio={inicio} />
      <div className="labelNPlayer">
        {estado === 0 ? <p> Number of players </p> : <div> </div>}
      </div>
      <div id="NoRootDiv">
        {estado === 0 ? (
          <>
            <NumberOfPlayersInput
              numberOfPlayer={getNumberOfPlayers}
              funcion={funcionDeClick}
            />
          </>
        ) : (
          <div> </div>
        )}
        {estado === 1 ? (
          <div className="ancho">
            {" "}
            <NameAndSkills
              sensibility={0}
              players={players}
              setPlayerName={setPlayerName}
              generateMatch={generateMatch}
            />
          </div>
        ) : (
          <div> </div>
        )}

        {estado === 2 ? (
          <div className="matchesDiv">
            <Matches
              matchesState={matchesState}
              matchResult={matchResult}
              matchResult2={matchResult2}
              players={players}
              sortPlayers={sortPlayers}
              totalEachPlayersPoints={totalEachPlayersPoints}
            />
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </>
  );
}
