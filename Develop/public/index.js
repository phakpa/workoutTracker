const continueButton = document.querySelector("#continue-btn");

continueButton.addEventListener("click", function (event) {
  console.log("continue clicked");
  console.log(location.search.split("=")[1]);
  window.location.replace("exercise.html?id=" + location.search.split("=")[1]);
});

init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none");
    }
  }
}
