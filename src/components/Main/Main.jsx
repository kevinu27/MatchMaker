import "./Main.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Header } from "../Header/Header";
import { NumberOfPlayersInput } from "../NumberOfPLayers/NumberOfPLayers";
import { NameAndSkills } from "../NameAndSkills/NameAndSkills";
import { Matches } from "../Matches/Matches";
import { getPlayers } from "../functions/functions";
import { back } from "../functions/functions";
import { mainPage } from "../functions/functions";
import { getNumberOfPlayers } from "../functions/functions";
import { setPlayerName } from "../functions/functions";
import { generateMatch } from "../functions/functions";
import { matchResult } from "../functions/functions";
import { matchResult2 } from "../functions/functions";
import { sortPlayers } from "../functions/functions";
import Button from "react-bootstrap/Button";
import { Profile } from "../profile/Profile";
import { totalEachPlayersPoints } from "../functions/functions";

export function Main(props) {
  const [sensibility, setSensibility] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [players, setPlayers] = useState([]);
  // const [page, setPage] = useState(0);
  const [matchesState, setMatches] = useState([]);
  const [registeredMembers, setRegisteredMembers] = useState([]);

  const changePlayerSkills = (playerId, playerSkills) => {
    const playersCopy = [...players];
    const playerToChange = playersCopy.find(
      (player) => player.playerIndex === playerId
    );
    playerToChange.skills = playerSkills;
    setPlayers(playersCopy);
  };

  // const sortPlayers = () => {
  //   const sorted = [...players].sort((a, b) => {
  //     return b.points - a.points;
  //   });
  //   setPlayers(sorted);
  // };

  const sliderChange = (e) => {
    setSensibility(e.target.value);
  };

  // function totalEachPlayersPoints(id) {
  //   // quiero filtrar los partidos donde participa un jugador
  //   console.log("totalEachPlayersPoints");
  //   const teamsMappedFromMatches = matchesState
  //     .map((match) => match.teams)
  //     .flat();
  //   const pointList = teamsMappedFromMatches
  //     .filter((team) =>
  //       team.members.some((member) => member.playerIndex === id)
  //     )
  //     .map((team) => team.points);
  //   const reducer = (previousValue, currentValue) =>
  //     previousValue + currentValue;
  //   const pointReduced = pointList.reduce(reducer);
  //   players.forEach((player) => {
  //     if (player.playerIndex === id) {
  //       player.points = pointReduced;
  //     }
  //   });
  //   return pointReduced;
  // }

  //////////////////////////////////////////////////////////////////////////////////////Return/////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* <Header
        back={(e) => {
          setPage(back(page));
        }}
        matchMakerTitle={(e) => setPage(mainPage(page))}
      /> */}
      <div className="labelNPlayer">
        {props.page === 0 ? <p> Number of players </p> : <div> </div>}
      </div>
      <div id="NoRootDiv">
        {props.page === 0 ? (
          <>
            <NumberOfPlayersInput
              numberOfPlayer={(e) => setNumberOfPlayers(getNumberOfPlayers(e))}
              generatePlayers={(e) => {
                setPlayers(getPlayers(e, numberOfPlayers));
                props.setPage(1);
              }}
            />
          </>
        ) : (
          <div> </div>
        )}
        {props.page === 1 ? (
          <div className="ancho">
            {" "}
            <NameAndSkills
              sensibility={0}
              players={players}
              setRegisteredMembers={setRegisteredMembers}
              registeredMembers={registeredMembers}
              setPlayerName={(e, playerId, playerName, players) => {
                setPlayers(setPlayerName(e, playerId, playerName, players));
              }}
              generateMatch={
                (e, players) => {
                  setMatches(generateMatch(e, players));
                  props.setPage(2);
                }

                //  generateMatch
              }
            />
          </div>
        ) : (
          <div> </div>
        )}

        {props.page === 2 ? (
          <div className="matchesDiv">
            <Matches
              setRegisteredMembers={setRegisteredMembers}
              registeredMembers={registeredMembers}
              setMatches={setMatches}
              matchesState={matchesState}
              matchResult={(e, id, matchesState) => {
                setMatches(matchResult(e, id, matchesState));
              }}
              matchResult2={(e, id, matchesState) => {
                setMatches(matchResult2(e, id, matchesState));
              }}
              players={players}
              sortPlayers={() => {
                setPlayers(sortPlayers(players));
              }}
              totalEachPlayersPoints={totalEachPlayersPoints}
            />
            <Button
              onClick={(e) => {
                props.setPage(3);
              }}
            >
              siguiente pagina
            </Button>
          </div>
        ) : (
          <div> </div>
        )}

        {props.page === 3 ? <p> show all player </p> : <div> </div>}
      </div>
    </>
  );
}
