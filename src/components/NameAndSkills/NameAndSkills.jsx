import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function NameAndSkills(props) {
  const [sensibility, setSensibility] = useState("0");
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);
  // const [registeredMembers, setRegisteredMembers] = useState([]);

  const sliderChange = (e) => {
    setSensibility(e.target.value);
  };

  const changePlayerSkills = () => {
    //mas adelante crear la funcion bien en el componenete start

    console.log("---");
  };

  const getAllPlayersAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/getAllPlayers`;

  const getMongoUserObjectFromInputName = (e, player) => {
    console.log("getMongoUserObjectFromInputName!!!!!!!!!!!!!!!!!");
    console.log("persona seleccionada de options", e.target.value);
    const registeredUser = users.map((user) =>
      user.username === e.target.value
        ? (player._id = user._id) //props.setRegisteredMembers([...props.registeredMembers, user._id]) /// aqui en ves de meterlo en el estado de registered members, hacer que se ponga en el player
        : null
    );

    console.log("registeredMembers", props.registeredMembers);
    ///poner aqui que si coincide el nombre del jugador en el input con algun objeto de la base de datos que ese objeto
    //// se guarde en el partido
    /// todavia no se si en el objeto matches.teams.player, o añadirle unas propiedades al objeto que sean esos jugadores
  };

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
                    key={player.playerIndex}
                    onChange={(e) => {
                      props.setPlayerName(
                        e,
                        player.playerIndex,
                        e.target.value,
                        props.players
                      );
                      console.log("e.target.value", e.target.value);

                      getMongoUserObjectFromInputName(e, player);

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
                key={player.playerIndex}
                // onChange={(e) => changePlayerSkills(player.id, e.target.value)}
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
