import React, { useState } from "react";
import Button from "react-bootstrap/Button";
export function NumberOfPlayersInput(props) {
  return (
    <>
      <div className="numOfPlayers">
        <input
          className="mr-5"
          type="number"
          // value={numberOfPlayers}
          //   onChange={(event) => setNumberOfPlayers(event.target.value)}
          onChange={props.numberOfPlayer}
        />
        <Button
          variant="btn btn-light"
          type="submit"
          onClick={(e) => props.funcion(e)}
        >
          Generar numero de players
        </Button>
      </div>
    </>
  );
}
