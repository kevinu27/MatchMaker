import "./Start.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Header } from "../Header/Header";
import { NumberOfPlayersInput } from "../NumberOfPLayers/NumberOfPLayers";
import { NameSkills } from "../NamesSkills/NamesSkills";

export function Start(props) {
  const [sensibility, setSensibility] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [players, setPlayers] = useState([]);
  const [estado, setEstado] = useState(0);
  let matchesTotal6;
  const [Matches, setMatches] = useState([]);
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
        currentPoints: [0],
        displayPoints: 0,
      }; ///atento esto era un int antes de hacer la prueba con array
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
    console.log("back");
  }
  function inicio() {
    setEstado(0);
    console.log("inicio");
  }

  function getNumberOfPlayers(event) {
    setNumberOfPlayers(event.target.value);
  }

  // const matchResult = (e, id) => {
  //   // console.log(e.target.value);
  //   //console.log("id", id);
  //   let pointsToPush = Points.concat(parseInt(e.target.value));
  //   console.log(
  //     "los pointsToPush que acabo de meter en el array",
  //     pointsToPush
  //   );

  //   ///reduce
  //   /*
  //   let pointsTotal = pointsToPush.reduce(
  //     (previousValue, currentValue) => previousValue + currentValue
  //   );*/

  //   const reducer = (previousValue, currentValue) =>
  //     previousValue + currentValue;
  //   console.log("pointsToPush", pointsToPush.reduce(reducer));
  //   let a = pointsToPush.reduce(reducer);

  //   setPoints(pointsToPush);
  //   console.log("Pointsssssss", Points);
  //   //const points = Points;
  //   // console.log("MatrchesId", Matches[0][2]);
  //   const playersScoring = Matches.find((match) => match[2] === id); // el [2] es la posicion en el array que es id, asi
  //   console.log("playersScoring", playersScoring);
  //   playersScoring[0][0].currentPoints = a;
  //   playersScoring[0][1].currentPoints = a;
  //   ///let array = e.target.vale
  //   /// setPoints(...Point + array )
  //   console.log("current points", playersScoring[0][0].currentPoints);
  //   sortPlayers();
  // };

  const matchResult = (e, id) => {
    if (e.target.value !== "") {
      let pointsToPush = Points.concat(parseInt(e.target.value));
      console.log(
        "los pointsToPush que acabo de meter en el array",
        pointsToPush
      );
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      console.log("pointsToPush", pointsToPush.reduce(reducer));
      let a = pointsToPush.reduce(reducer);

      setPoints(pointsToPush);
      console.log("Pointsssssss", Points);
      //const points = Points;
      // console.log("MatrchesId", Matches[0][2]);
      const playersScoring = Matches.find((match) => match[2] === id); // el [2] es la posicion en el array que es id, asi
      console.log("playersScoring", playersScoring);

      playersScoring[0][0].currentPoints =
        playersScoring[0][0].currentPoints.concat(parseInt(e.target.value));
      playersScoring[0][0].displayPoints =
        playersScoring[0][0].currentPoints.reduce(reducer);
      playersScoring[0][1].currentPoints =
        playersScoring[0][1].currentPoints.concat(parseInt(e.target.value));
      playersScoring[0][1].displayPoints =
        playersScoring[0][1].currentPoints.reduce(reducer);
      console.log("DisplayPoint", playersScoring[0][0].displayPoints);
      ///let array = e.target.vale
      /// setPoints(...Point + array )
      console.log("current points", playersScoring[0][0].currentPoints);
      sortPlayers();
    }
  };

  const sortPlayers = () => {
    console.log(players);
    const sorted = [...players].sort((a, b) => {
      return b.displayPoints - a.displayPoints;
    });
    setPlayers(sorted);
  };

  const matchResult2 = (e, id) => {
    if (e.target.value !== "") {
      let pointsToPush = Points.concat(parseInt(e.target.value));
      console.log(
        "los pointsToPush que acabo de meter en el array",
        pointsToPush
      );
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      console.log("pointsToPush", pointsToPush.reduce(reducer));
      let a = pointsToPush.reduce(reducer);

      setPoints(pointsToPush);
      console.log("Pointsssssss", Points);
      //const points = Points;
      // console.log("MatrchesId", Matches[0][2]);
      const playersScoring = Matches.find((match) => match[2] === id); // el [2] es la posicion en el array que es id, asi
      console.log("playersScoring", playersScoring);

      playersScoring[1][0].currentPoints =
        playersScoring[1][0].currentPoints.concat(parseInt(e.target.value));
      playersScoring[1][0].displayPoints =
        playersScoring[1][0].currentPoints.reduce(reducer);
      playersScoring[1][1].currentPoints =
        playersScoring[1][1].currentPoints.concat(parseInt(e.target.value));
      playersScoring[1][1].displayPoints =
        playersScoring[1][1].currentPoints.reduce(reducer);
      console.log("DisplayPoint", playersScoring[0][0].displayPoints);
      ///let array = e.target.vale
      /// setPoints(...Point + array )
      console.log("current points", playersScoring[0][0].currentPoints);
      sortPlayers();
    }
  };

  function generateMatch(players) {
    setEstado(2);

    let matches = [];
    let matchesTotal = [];

    //1-juntando jugador con jugador
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < players.length; j++) {
        if (i === j) {
          continue;
        }

        matches = [players[j], players[i]];
        matchesTotal.push([...matches]);
      }
    }

    //2-despues eliminar los que coincindan
    matches = [];

    let element1;
    let element2;
    let matchesTotal2 = [...matchesTotal];

    for (let i = 0; i < matchesTotal2.length; i++) {
      element1 = matchesTotal2[i][0];
      element2 = matchesTotal2[i][1];

      for (let j = 0; j < matchesTotal2.length; j++) {
        if (i === j) {
          continue;
        }
        // element1 = matchesTotal2[i][0];
        // element2 = matchesTotal2[i][1];

        if (
          element1 === matchesTotal2[j][1] &&
          element2 === matchesTotal2[j][0]
        ) {
          if (i < j) {
            matchesTotal2.splice(j, 1);
          }
          break;
        }
      }
    }
    // 3-matches de 2 vs 2 con repetidos
    let matchesTotal3 = [...matchesTotal2];
    let matchesTotal4 = [];

    for (let i = 0; i < matchesTotal3.length; i++) {
      for (let j = 0; j < matchesTotal3.length; j++) {
        if (i === j) {
          continue;
        }
        matches = [matchesTotal3[j], matchesTotal3[i]];
        matchesTotal4.push([...matches]);
      }
    }
    // 4-matches de 2 vs 2 sin repetidos
    let matchesTotal5 = [...matchesTotal4];
    for (let i = 0; i < matchesTotal5.length; i++) {
      element1 = matchesTotal5[i][0];
      element2 = matchesTotal5[i][1];
      let a;
      for (let j = 0; j < matchesTotal5.length; j++) {
        if (i === j) {
          continue;
        }
        element1 = matchesTotal5[i][0];
        element2 = matchesTotal5[i][1];

        if (
          element1 === matchesTotal5[j][1] &&
          element2 === matchesTotal5[j][0]
        ) {
          if (i < j) {
            matchesTotal5.splice(j, 1);
          }
          break;
        }
      }
    }
    //5-eliminar los partidos en los que un jugador este en dos equipos al mismo tiempo
    matchesTotal6 = [...matchesTotal5];
    for (let i = 0; i < matchesTotal6.length; i++) {
      if (
        matchesTotal6[i][0][0] === matchesTotal6[i][1][0] ||
        matchesTotal6[i][0][0] === matchesTotal6[i][1][1] ||
        matchesTotal6[i][0][1] === matchesTotal6[i][1][0] ||
        matchesTotal6[i][0][1] === matchesTotal6[i][1][1]
      ) {
        matchesTotal6.splice(i, 1);
        i = i - 1;
      }
    }

    ///7-
    let matchesTotalFinal = [];
    for (let i = 0; i < matchesTotal6.length; i++) {
      matchesTotalFinal[i] = [...matchesTotal6[i], i];
    }
    // setMatches(matchesTotalFinal);
    ///////////////////////////////////////////////////
    let matchesTotal7 = [...matchesTotal6];

    //6- intento de alterar el orden del array

    for (let i = matchesTotalFinal.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [matchesTotalFinal[i], matchesTotalFinal[j]] = [
        matchesTotalFinal[j],
        matchesTotalFinal[i],
      ];
    }
    setMatches(matchesTotalFinal);
    let BalancedMatch;
    BalancedMatch = matchesTotalFinal.filter((elm) => {
      if (
        Math.abs(
          elm[0][0].skills +
            elm[0][1].skills -
            (elm[1][0].skills + elm[1][1].skills)
        ) <= sensibility
      ) {
        console.log("elm", elm);
        return true;
      }
    });
    console.log("BalancedMatch", BalancedMatch);
    setMatches(BalancedMatch);
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
            {Matches.map((match) => (
              <div className="MatchRow">
                {console.log("Match", match)}

                <div className="playersTeam">
                  <p className="player">{match[0][0].name}</p>{" "}
                  <p className="player">{match[0][1].name}</p>
                </div>
                <div className="versus">
                  <p> VS </p>
                </div>
                <div className="playersTeam">
                  <p className="player">{match[1][0].name}</p>{" "}
                  <p className="player">{match[1][1].name}</p>
                </div>

                <div className="inputResultDiv">
                  {" "}
                  <input
                    type="text"
                    onBlur={(e) => matchResult(e, match[2])}
                    // onChange={(event) => setNumberOfPlayers(event.target.value)}
                  />{" "}
                  <input
                    type="text"
                    // onChange={(e) => matchResult2(e, match[2])}
                    onBlur={(e) => matchResult2(e, match[2])}
                    // onChange={(event) => setNumberOfPlayers(event.target.value)}
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
              {players.map((player) => (
                <div className="playerRanking">
                  <div className="playerRankingDiv">
                    <p className="player">{player.name}</p>{" "}
                  </div>
                  <div className="playerRankingDiv">
                    <p className="player">{player.displayPoints}</p>{" "}
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
}
