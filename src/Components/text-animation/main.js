import './style.css'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

export const changeTextLetter = (event) => {
  let iteration = 0;
  const initText = event.target.innerText;
  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = initText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.textValue[index];
        }
        return letters[Math.floor(Math.random() * 26)]; // Use the full alphabet range
      })
      .join("");
    if (iteration >= event.target.dataset.textValue.length) {
      clearInterval(interval);
    }
    iteration += 1 / 10;
  }, 20);
};