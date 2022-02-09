import "./Start.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Header } from "../Header/Header";
import { NumberOfPlayersInput } from "../NumberOfPLayers/NumberOfPLayers";
import { NameSkills } from "../NamesSkills/NamesSkills";
import { matches } from "dom-helpers";

export function Start(props) {
  const [result, setResult] = useState();
  const [sensibility, setSensibility] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [players, setPlayers] = useState([]);
  const [estado, setEstado] = useState(0);
  let matchesTotal6;
  const [matchesState, setMatches] = useState([]);
  const [Points, setPoints] = useState([]);

  let playersSorted = [];

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
        // currentPoints: [],
        // displayPoints: 0,
      };
      newPlayers.push(newPlayer);
    }
    setPlayers(newPlayers);
    setEstado(1);
  };

  const changePlayerName = (playerId, playerName) => {
    const playersCopy = [...players];
    const playerToChange = playersCopy.find((player) => player.id === playerId);
    playerToChange.name = playerName;
    setPlayers(playersCopy);
  };
  const changePlayerSkills = (playerId, playerSkills) => {
    const playersCopy = [...players];
    const playerToChange = playersCopy.find((player) => player.id === playerId);
    playerToChange.skills = playerSkills;
    setPlayers(playersCopy);
  };

  function back() {
    setEstado(estado - 1);
    // console.log("back");
  }
  function inicio() {
    setEstado(0);
    //  console.log("inicio");
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
      // console.log("Matches.......||||||------.....", matchesCopy);
      // console.log("pointsToPush.......||||||------.....", pointsToPush);

      setMatches(matchesCopy);
    }
  };

  const sortPlayers = () => {
    // console.log(players);
    const sorted = [...players].sort((a, b) => {
      return b.points - a.points;
    });
    setPlayers(sorted);
  };

  const matchResult2 = (e, id) => {
    if (e.target.value !== "") {
      let pointsToPush = Points.concat(parseInt(e.target.value));
      // console.log(
      //   "los pointsToPush que acabo de meter en el array",
      //   pointsToPush
      // );
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      // console.log("pointsToPush", pointsToPush.reduce(reducer));
      let a = pointsToPush.reduce(reducer);

      setPoints(pointsToPush);
      // console.log("Pointsssssss", Points);

      const playersScoring = matchesState.find((match) => match[2] === id);
      // console.log("playersScoring", playersScoring);

      playersScoring[1][0].currentPoints =
        playersScoring[1][0].currentPoints.concat(parseInt(e.target.value));
      playersScoring[1][0].displayPoints =
        playersScoring[1][0].currentPoints.reduce(reducer);
      playersScoring[1][1].currentPoints =
        playersScoring[1][1].currentPoints.concat(parseInt(e.target.value));
      playersScoring[1][1].displayPoints =
        playersScoring[1][1].currentPoints.reduce(reducer);
      // console.log("DisplayPoint", playersScoring[0][0].displayPoints);
      // console.log("current points", playersScoring[0][0].currentPoints);
      sortPlayers();
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

    // console.log("matches.....", matches);

    // 4-matches de 2 vs 2 sin jugadores jugando en dos equipos a la vez

    for (let i = 0; i < matches.length; i++) {
      //   for (let j = 0; j < matches.length; j++) {
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
    // console.log("matches.....!!!!", matches);
    // console.log("matches.length antes", matches.length);

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
          // console.log("dentro");
          matches.splice(j, 1);
          j = j - 1;
          break;
        }
      }
    }
    // //////////////////////////////

    setMatches(matches);
  }
  const sliderChange = (e) => {
    setSensibility(e.target.value);
  };

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
            <div className="labelsDiv">
              <div className="label"> Player Name </div>
              <div className="label"> Player Skill Level</div>
            </div>

            <label for="customRange1" class="form-label">
              Get rid of the weakest: {sensibility}
            </label>
            <input
              className="slider"
              type="range"
              class="form-range"
              id="customRange1"
              min="0"
              max="10"
              steps="1"
              value={sensibility}
              onChange={sliderChange}
            />

            {players.map((player) => (
              <div className="divInputs">
                <input
                  type="text"
                  value={player.name}
                  key={player.id}
                  onChange={(e) => changePlayerName(player.id, e.target.value)}
                />
                <input
                  type="text"
                  value={player.skills}
                  key={player.id}
                  onChange={(e) =>
                    changePlayerSkills(player.id, e.target.value)
                  }
                />
              </div>
            ))}

            <Button
              variant="btn btn-light generateButton"
              type="submit"
              onClick={(e) => generateMatch(players)}
            >
              Generate Matches
            </Button>
          </div>
        ) : (
          <div> </div>
        )}

        {estado === 2 ? (
          <div className="matchesDiv">
            {matchesState.map((match) => (
              <div className="MatchRow">
                <div className="playersTeam">
                  <p className="player">{match.teams[0].members[0].name}</p>{" "}
                  <p className="player">{match.teams[0].members[1].name}</p>
                </div>
                <div className="versus">
                  <p> VS </p>
                </div>
                <div className="playersTeam">
                  <p className="player">{match.teams[1].members[0].name}</p>{" "}
                  <p className="player">{match.teams[1].members[1].name}</p>
                </div>

                <div className="inputResultDiv">
                  {" "}
                  <input
                    type="text"
                    onChange={(e) => matchResult(e, match.id)}
                  />{" "}
                  <input
                    type="text"
                    onChange={(e) => matchResult2(e, match[2])}
                  />{" "}
                </div>
              </div>
            ))}

            <Button
              variant="btn btn-light submitMatchButton"
              type="submit"
              onClick={(e) => sortPlayers()}
            >
              Submit Result
            </Button>
            <div className="labelNPlayer mt-5">
              {" "}
              <p> Current Ranking</p>
            </div>

            <div className="MatchRow2">
              {/* //el map que se haga sobre el sorted
              
              const sortPlayers = () => {
    // console.log(players);
    const sorted = [...players].sort((a, b) => {
      return b.points - a.points;
    });
    setPlayers(sorted);
  };
              */}
              {[...players]
                .sort((a, b) => {
                  return b.points - a.points;
                })
                .map((player) => (
                  <div className="playerRanking">
                    <div className="playerRankingDiv">
                      <p className="player">{player.name}</p>{" "}
                    </div>
                    <div className="playerRankingDiv">
                      <p className="player">
                        {newFunction(player.id)}
                        {/* {console.log(
                        "newFunction(player.id)",
                        newFunction(player.id)
                      )} */}
                      </p>{" "}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </>
  );

  function newFunction(id) {
    // quiero filtrar los partidos donde participa un jugador
    const teamsMappedFromMatches = matchesState
      .map((match) => match.teams)
      .flat(); ///con esto se quitar un array de la jerarquia

    const pointList = teamsMappedFromMatches
      .filter((team) => team.members.some((member) => member.id === id))
      .map((team) => team.points);
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    const pointReduced = pointList.reduce(reducer);

    const playersCopy = [...players];
    ///  Por que coño con players.forEach((player) => { o con playersCopy.forEach((player) => {  me actualiza el estado????????????
    players.forEach((player) => {
      if (player.id === id) {
        player.points = pointReduced;
      }
    });

    console.log("playersCopy", playersCopy);
    console.log("playerState", players);
    console.log("--------------");

    return pointReduced;
  }
}
