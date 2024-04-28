const checkboxList = document.querySelectorAll(".custom-checkbox");
console.log(checkboxList);
const inputList = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let countCompleted = Object.values(allGoals).filter(
  (value) => value.completed
).length;
progressValue.style.width = `${countCompleted/3 * 100}%`
progressValue.firstElementChild.innerText = `${countCompleted}/3`

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
      progressValue.style.width = `${countCompleted/3 * 100}%`
      progressValue.firstElementChild.innerText = `${countCompleted}/3`
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  })
);

inputList.forEach((input) => {
  input.value = allGoals[input.id].goal;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () =>
    progressBar.classList.remove("show-error")
  );
  input.addEventListener("input", (e) => {
    allGoals[input.id] = {
      goal: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
