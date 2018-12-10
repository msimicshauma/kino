let drawsArray = {};
const resultsContainer = document.getElementById("results");
const refreshBtn = document.getElementById("refresh");

const getData = () => {
  fetch("https://api.opap.gr/draws/v3.0/1100/last/11")
    .then(res => {
      return res.json();
    })
    .then(data => {
      for (let i = 1; i < data.length; i++)
        drawsArray[i] = data[i].winningNumbers.list.sort((a, b) => {
          return a - b;
        });

      return drawsArray;
    })
    .then(drawsArray => {
      const draws = Object.keys(drawsArray);
      draws.forEach(draw => {
        const resultsDiv = document.createElement("div");
        resultsDiv.className = "draw-container";
        const numbers = document.createElement("div");
        numbers.className = "numbers-container";

        //NUMBER CONTAINER
        for (let i = 0; i < drawsArray[draw].length; i++) {
          const numberContainer = document.createElement("div");
          numberContainer.className = "number";
          numberContainer.innerHTML = drawsArray[draw][i];
          numbers.appendChild(numberContainer);
        }

        //INFO CONTAINER
        const infoContainer = document.createElement("div");
        infoContainer.className = "info";

        let counter1 = 0,
          counter2 = 0,
          counter3 = 0,
          counter4 = 0,
          counter5 = 0,
          counter6 = 0,
          counter7 = 0,
          counter8 = 0;

        for (let i = 0; i < drawsArray[draw].length; i++) {
          if (drawsArray[draw][i] <= 10) counter1++;
          else if (drawsArray[draw][i] > 10 && drawsArray[draw][i] <= 20)
            counter2++;
          else if (drawsArray[draw][i] > 20 && drawsArray[draw][i] <= 30)
            counter3++;
          else if (drawsArray[draw][i] > 30 && drawsArray[draw][i] <= 40)
            counter4++;
          else if (drawsArray[draw][i] > 40 && drawsArray[draw][i] <= 50)
            counter5++;
          else if (drawsArray[draw][i] > 50 && drawsArray[draw][i] <= 60)
            counter6++;
          else if (drawsArray[draw][i] > 60 && drawsArray[draw][i] <= 70)
            counter7++;
          else counter8++;
        }

        const drawInfo = document.createElement("span");
        drawInfo.className = "draw-info";
        drawInfo.innerHTML = `Draw ${draw}`;

        infoContainer.innerHTML = `From 01 to 10 - ${counter1} <br>
                                From 11 to 20 - ${counter2} <br>
                                From 21 to 30 - ${counter3} <br>
                                From 31 to 40 - ${counter4} <br>
                                From 41 to 50 - ${counter5} <br>
                                From 51 to 60 - ${counter6} <br>
                                From 61 to 70 - ${counter7} <br>
                                From 71 to 80 - ${counter8} <br>`;

        infoContainer.appendChild(drawInfo);

        resultsDiv.appendChild(numbers);
        resultsDiv.appendChild(infoContainer);
        resultsContainer.appendChild(resultsDiv);
      });
    });
};

const refreshData = () => {};

window.onload = getData();

refreshBtn.addEventListener("click", () => {
  refreshData();
});
