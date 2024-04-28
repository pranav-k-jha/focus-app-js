const checkboxList = document.querySelectorAll(".custom-checkbox");
console.log(checkboxList);
const inputList = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const allQuotes = [
  "Set your Goals for Today",
  "Well begun is half done!",
  "Just few more steps away, keep going!",
  "Just few more steps away, keep going!",
  "Just few more steps away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D"
];
const inputLength = inputList.length;

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let countCompleted = Object.values(allGoals).filter(
  (value) => value.completed
).length;

progressValue.style.width = `${(countCompleted / inputLength) * 100}%`;
progressValue.firstElementChild.innerText = `${countCompleted}/${inputLength} completed`;
progressLabel.innerText =
  allQuotes[countCompleted] ||
  `Congratulation for completing the ${inputLength}th the goal for today!`;

checkboxList.forEach((checkbox) =>
  checkbox.addEventListener("click", (e) => {
    const allInputFilled = [...inputList].every((input) => input.value);

    if (allInputFilled) {
      checkbox.parentElement.classList.toggle("completed");
      const inputChecked = checkbox.nextElementSibling;
      allGoals[inputChecked.id].completed =
        !allGoals[inputChecked.id].completed;
      countCompleted = Object.values(allGoals).filter(
        (value) => value.completed
      ).length;

      progressValue.style.width = `${(countCompleted / inputLength) * 100}%`;
      progressValue.firstElementChild.innerText = `${countCompleted}/${inputLength} completed`;
      progressLabel.innerText =
        allQuotes[countCompleted] ||
        `Congratulation for completing the ${countCompleted}th the goal for today!`;

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  })
);

inputList.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () =>
    progressBar.classList.remove("show-error")
  );
  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
