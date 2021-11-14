import "./Start.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom";
import React, { useState } from "react";

export function Start(props) {
  const [count, setCount] = useState();
  const [temp, setTemp] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [players, setPlayers] = useState([]);
  const INITIAL_PLAYERS = [
    { id: 1, name: "player1", skills: 700 },
    { id: 2, name: "player2", skills: 300 },
  ];

  ///haer un use state
  console.log("PLAYERS", players);

  function funcionDeClick(e) {
    e.preventDefault();
    console.log(numberOfPlayers);
    const newPlayers = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      const newPlayer = { name: "", id: i };
      newPlayers.push(newPlayer);
    }
    setPlayers(newPlayers);
  }

  const changePlayerName = (playerId, playerName) => {
    const playersCopy = [...players];
    const playerToChange = playersCopy.find((player) => player.id === playerId);
    playerToChange.name = playerName;
    setPlayers(playersCopy);
  };

  return (
    <>
      <div id="NoRootDiv">
        {/* <form className="numOfPlayers" action=""> */}
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
            Generar numero de jugadores
          </Button>
          {players.map((player) => (
            <input
              type="text"
              value={player.name}
              key={player.id}
              onChange={(e) => changePlayerName(player.id, e.target.value)}
            />
          ))}
        </div>
        <p>hola {count}</p>
      </div>
    </>
  );
}
