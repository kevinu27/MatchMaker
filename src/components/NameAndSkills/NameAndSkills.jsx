import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export function NameAndSkills(props) {
  const [sensibility, setSensibility] = useState("0");

  const sliderChange = (e) => {
    setSensibility(e.target.value);
  };

  const changePlayerSkills = () => {
    //mas adelante crear la funcion bien en el componenete start

    console.log("---");
  };

  return (
    <>
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

        {props.players.map((player) => (
          <div className="divInputs">
            <input
              type="text"
              value={player.name}
              key={player.id}
              onChange={(e) => props.setPlayerName(player.id, e.target.value)}
            />
            <input
              type="text"
              value={player.skills}
              key={player.id}
              //   onChange={(e) => changePlayerSkills(player.id, e.target.value)}
            />
          </div>
        ))}

        <Button
          variant="btn btn-light generateButton"
          type="submit"
          onClick={(e) => props.generateMatch(props.players)}
        >
          Generate Matches
        </Button>
      </div>
    </>
  );
}
