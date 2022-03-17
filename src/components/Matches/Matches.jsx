import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function Matches(props) {
  const matchAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = "http://localhost:5001/api/match/newMatch";
  const MatchesfromProps = props.matchesState;

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
            console.log("MatchesfromProps", MatchesfromProps);

            matchAxios.post(baseURL, MatchesfromProps).then((match) => {
              console.log("match", match);
            });
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
                    {props.totalEachPlayersPoints(player.id)}
                  </p>{" "}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
