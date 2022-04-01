import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function Profile(props) {
  const [userMatches, setUserMatches] = useState([]);

  const getyAllYourMatchesAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/match/profile/${props.loggedUser._id}`;

  useEffect(() => {
    console.log("loggedUser---", props.loggedUser._id);
    getyAllYourMatchesAxios.get(baseURL).then((matchesFromDatabase) => {
      console.log("users", matchesFromDatabase.data);
    });
  }, []);

  return (
    <>
      <h1>Profile</h1>
    </>
  );
}
