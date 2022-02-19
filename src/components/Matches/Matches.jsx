import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export function Matches(props) {
  return (
    <>
      <div className="matchesDiv">
        {props.matchesState.map((match) => (
          <div className="MatchRow">
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
                onChange={(e) => props.matchResult(e, match.id)}
              />{" "}
              <input
                type="text"
                onChange={(e) => props.matchResult2(e, match.id)}
              />{" "}
            </div>
          </div>
        ))}

        <Button
          variant="btn btn-light submitMatchButton"
          type="submit"
          onClick={(e) => props.sortPlayers()}
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
