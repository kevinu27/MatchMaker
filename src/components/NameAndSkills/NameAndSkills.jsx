import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function NameAndSkills(props) {
  const [sensibility, setSensibility] = useState("0");
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);

  const sliderChange = (e) => {
    setSensibility(e.target.value);
  };
  // const addOptions = (e) => {
  //   const newOption = [...options, e.target.value];
  //   console.log("e.target.value", e.target.value);
  //   setOptions(newOption);
  //   console.log("options", options);
  // };

  const changePlayerSkills = () => {
    //mas adelante crear la funcion bien en el componenete start

    console.log("---");
  };

  const getAllPlayersAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = "http://localhost:5001/api/getAllPlayers";

  const afterLoad = (e) => {
    console.log("afterload");
    setOptions(e.target.value);

    console.log(options);
  };

  const keepUser = () => {
    console.log("keepUser!!!!!!!!!!!!!!!!!");
  };
  // afterLoad();
  useEffect(() => {
    console.log("useEffect");
    getAllPlayersAxios.get(baseURL).then((usersFromDatabase) => {
      console.log("users", usersFromDatabase.data);
      setUsers(usersFromDatabase.data);
      console.log("usersState", users);
    });
  }, []);

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
          id="customRange1"
          min="0"
          max="10"
          steps="1"
          value={sensibility}
          onChange={sliderChange}
        />

        {props.players.map((player) => (
          <>
            <div className="divInputs">
              <div className="inputNameAndPlayersplayersFromDatabase">
                <div>
                  <input
                    id="country"
                    name="country"
                    required
                    list="country-list"
                    type="text"
                    value={player.name}
                    key={player.id}
                    onChange={(e) => {
                      props.setPlayerName(
                        e,
                        player.id,
                        e.target.value,
                        props.players
                      );
                      console.log("e.target.value", e.target.value);
                      // afterLoad(e);
                    }}
                  />
                  <datalist id="country-list">
                    {options
                      ? users.map((option, index) => (
                          <option key={index} value={option.username}>
                            {" "}
                            {option.username}
                          </option>
                        ))
                      : null}
                  </datalist>
                </div>
              </div>
              <input
                type="text"
                value={player.skills}
                key={player.id}
                //   onChange={(e) => changePlayerSkills(player.id, e.target.value)}
              />
            </div>
          </>
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
