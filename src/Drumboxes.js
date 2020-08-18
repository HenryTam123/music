import React, { useState, useEffect } from "react";

const Drumboxes = () => {
  var count = 0;
  const [speed, setSpeed] = useState(500);
  const sounds = ["clap", "hihat", "kick", "snare", "ride", "perc", "tom"];

  useEffect(() => {
    const interval = setInterval(() => {
      if (count + 1 > 8) {
        count = 0;
      }
      for (let i = 0; i < 7; i++) {
        const container = document.getElementsByClassName("button-container")[
          i
        ];
        const button = container.children[count];
        if (count > 0) {
          const prevbutton = container.children[count - 1];
          prevbutton.style.transform = "scale(1)";
        } else {
          const prevbutton = container.children[7];
          prevbutton.style.transform = "scale(1)";
        }

        button.style.transform = "scale(1.1)";

        if (button.value === "1") {
          const sound = new Audio(process.env.PUBLIC_URL + `${sounds[i]}0.wav`);
          sound.play();
        }
      }
      count++;
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      const drums = document.getElementsByClassName("drums")[0];
      const container = document.createElement("div");
      const header = document.createElement("h2");
      header.innerHTML = sounds[i];

      container.classList.add("button-container");
      header.classList.add("description");

      drums.appendChild(container);

      for (let i = 0; i < 8; i++) {
        const button = document.createElement("button");
        button.value = "0";
        button.addEventListener("click", (e) => {
          if (e.target.value === "0") {
            e.target.value = "1";
            e.target.style.backgroundColor = "#a3bded";
          } else {
            e.target.value = "0";
            e.target.style.backgroundColor = "rgb(228, 225, 225)";
          }
        });
        container.appendChild(button);
      }
    }
  }, []);

  const handleChange = (e) => {
    setSpeed(e.target.value);
  };

  return (
    <div className="drum-page">
      <h2 className="main-header">Tam's Music Maker &#127926;</h2>
      <h4 class="second-header">
        Click any boxes below to start making your music
      </h4>
      <div className="drums">
        <input
          type="range"
          min="100"
          max="1500"
          value={speed}
          className="slider"
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};

export default Drumboxes;
