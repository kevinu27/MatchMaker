import "./Start.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom";
import React, { useState } from "react";

export function Start(props) {
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [players, setPlayers] = useState([]);
  const [estado, setEstado] = useState(0);
  let matchesTotal6;
  const [Matches, setMatches] = useState([]);

  function funcionDeClick(e) {
    e.preventDefault();
    setEstado("iniciado");

    const newPlayers = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      const newPlayer = { name: "", id: i, skills: 0, currentPoints: 0 };
      newPlayers.push(newPlayer);
    }
    setPlayers(newPlayers);
    setEstado(1);
  }

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

  const back = () => {
    const estadoTemp = estado - 1;
    setEstado(estadoTemp);
  };

  const back = () => {
    const estadoTemp = estado - 1;
    setEstado(estadoTemp);
  };

  function generateMatch(players) {
    setEstado(2);

    const sensibility = 10;

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

    // console.log("matchesTotal6", matchesTotal6);
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

    let BalancedMatch = matchesTotal7.filter((elm) => {
      if (
        Math.abs(
          elm[0][0].skills +
            elm[0][1].skills -
            elm[1][0].skills -
            elm[1][1].skills
        ) <= sensibility
      ) {
        return true;
      }
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////Return/////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="header">
        <div className="subheader">
          <div onClick={() => back()}>Back</div>
          <div
            onClick={() => {
              setEstado(0);
            }}
          >
            Match Maker
          </div>
          <div>User</div>
        </div>
      </div>{" "}
      <div className="labelNPlayer">
        {" "}
        <p> Number of players </p>
      </div>
      <div id="NoRootDiv">
        {estado === 0 ? (
          <>
            <div className="numOfPlayers">
              <input
                className="mr-5"
                type="number"
                value={numberOfPlayers}
                onChange={(event) => setNumberOfPlayers(event.target.value)}
              />
              <Button
                variant="btn btn-light"
                type="submit"
                onClick={(e) => funcionDeClick(e)}
              >
                Generar numero de players
              </Button>
            </div>
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

                    // onChange={(event) => setNumberOfPlayers(event.target.value)}
                  />{" "}
                  <input
                    type="text"

                    // onChange={(event) => setNumberOfPlayers(event.target.value)}
                  />{" "}
                </div>
              </div>
            ))}

            <Button
              variant="btn btn-light submitMatchButton"
              type="submit"
              // onClick={(e) => generateMatch(players)}
            >
              Submit Result
            </Button>
            <div className="labelNPlayer mt-5">
              {" "}
              <p> Current Ranking</p>
            </div>

            <div>
              <p> Ranking</p>
            </div>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </>
  );
}
