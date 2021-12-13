// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// export function NameSkills(props) {
//   return (
//     <>
//       <div className="ancho">
//         <div className="labelsDiv">
//           <div className="label"> Player Name </div>
//           <div className="label"> Player Skill Level</div>
//         </div>
//         {players.map((player) => (
//           <div className="divInputs">
//             <input
//               type="text"
//               value={player.name}
//               key={player.id}
//               onChange={(e) => changePlayerName(player.id, e.target.value)}
//             />
//             <input
//               type="text"
//               value={player.skills}
//               key={player.id}
//               onChange={(e) => changePlayerSkills(player.id, e.target.value)}
//             />
//           </div>
//         ))}

//         <Button
//           variant="btn btn-light generateButton"
//           type="submit"
//           onClick={(e) => generateMatch(players)}
//         >
//           Generate Matches
//         </Button>
//       </div>
//     </>
//   );
// }
