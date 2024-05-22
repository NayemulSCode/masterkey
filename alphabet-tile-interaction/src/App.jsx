import { useState } from "react";
import Tile from "./components/Tile";

const App = () => {
  const [outputString, setOutputString] = useState("");

  const handleTileClick = (letter) => {
    let newOutput = outputString + letter;
    newOutput = replaceConsecutiveLetters(newOutput);
    setOutputString(newOutput);
  };

  const replaceConsecutiveLetters = (str) => {
    return str.replace(/(.)\1{2,}/g, (match) => "_".repeat(match.length));
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="app">
      <div id="outputString">{outputString}</div>
      <div className="grid">
        {alphabet.map((letter) => (
          <Tile key={letter} letter={letter} onClick={handleTileClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
