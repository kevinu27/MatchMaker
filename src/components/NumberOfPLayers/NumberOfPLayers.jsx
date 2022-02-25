import React, { useState } from "react";
import Button from "react-bootstrap/Button";
export function NumberOfPlayersInput(props) {
  return (
    <>
      <div className="numOfPlayers">
        <input className="mr-5" type="number" onChange={props.numberOfPlayer} />
        <Button
          variant="btn btn-light"
          type="submit"
          onClick={(e) => props.generatePlayers(e)}
        >
          Generate players
        </Button>
      </div>
    </>
  );
}
