const checkboxList = document.querySelectorAll(".custom-checkbox");
console.log(checkboxList);
const inputList = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

checkboxList.forEach((checkbox) =>
  checkbox.addEventListener("click", (e) => {
    const allInputFilled = [...inputList].every((input) => input.value);

    if (allInputFilled) {
      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = "33.33%";
      const inputChecked = checkbox.nextElementSibling;
      allGoals[inputChecked.id].completed =
        !allGoals[inputChecked.id].completed;
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
