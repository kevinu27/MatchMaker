import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function Matches(props) {
  const matchAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/match/newMatch`;
  // const MatchesfromProps = props.matchesState;

  return (
    <>
      <div className="matchesDiv">
        {props.matchesState.map((match, index) => (
          <div className="MatchRow" key={index}>
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
                onChange={(e) =>
                  props.matchResult(e, match.id, props.matchesState)
                }
              />{" "}
              <input
                type="text"
                onChange={(e) =>
                  props.matchResult2(e, match.id, props.matchesState)
                }
              />{" "}
            </div>
          </div>
        ))}

        <Button
          variant="btn btn-light submitMatchButton"
          type="submit"
          onClick={(e) => {
            console.log(
              "props.registered..........Member.",
              props.registeredMembers
            );

            //   const game= {
            //   games: props.matchState,
            //   type:
            // }
            // const matchWithRegisteredMembersToMatch = props.matchesState;
            // matchWithRegisteredMembersToMatch.id = props.registeredMembers;
            // props.setMatches(matchWithRegisteredMembersToMatch);

            console.log(
              "props.matchesState justo antes de enviar",
              props.matchesState
            );

            matchAxios.post(baseURL, props.matchesState).then((match) => {});
          }}
        >
          Submit Result
        </Button>
        <div className="labelNPlayer mt-5">
          {" "}
          <p> Current Ranking</p>
        </div>

        <div className="MatchRow2">
          {[...props.players]
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
                    {console.log("player....-----.", player.playerIndex)}
                    {newFunction(player.playerIndex)}
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
    </>
  );

  function newFunction(id) {
    // quiero filtrar los partidos donde participa un jugador
    console.log("id", id);
    const teamsMappedFromMatches = props.matchesState
      .map((match) => match.teams)
      .flat(); ///con esto se quitar un array de la jerarquia
    console.log("teamsMappedFromMatches", teamsMappedFromMatches);
    const pointList = teamsMappedFromMatches
      .filter((team) =>
        team.members.some((member) => member.playerIndex === id)
      )
      .map((team) => team.points);
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    const pointReduced = pointList.reduce(reducer);

    const playersCopy = [...props.players];
    ///  Por que coño con players.forEach((player) => { o con playersCopy.forEach((player) => {  me actualiza el estado????????????
    props.players.forEach((player) => {
      if (player.playerIndex === id) {
        player.points = pointReduced;
      }
    });

    console.log("playersCopy", playersCopy);
    console.log("playerState", props.players);
    console.log("--------------");

    return pointReduced;
  }
}
