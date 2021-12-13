import React, { useState } from "react";
export function Header(props) {
  return (
    <>
      <div className="header">
        <div className="subheader">
          <div onClick={props.back}>Back</div>
          <div onClick={props.inicio}>Match Maker</div>
          <div>User</div>
        </div>
      </div>
    </>
  );
}
