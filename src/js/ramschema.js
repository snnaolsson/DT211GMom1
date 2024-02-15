const scheduleEl = document.getElementById("schedule-list");
window.onload = init();

async function init() {
  loadSchedule();
}

async function loadSchedule() {
  try {
    const response = await fetch(
      "https://webbutveckling.miun.se/files/ramschema_ht23.json"
    );
    const courseInfo = await response.json();

    displaySchedule(courseInfo);
  } catch (error) {
    console.log("Ett fel uppstod");
  }
}

function displaySchedule(courseInfo) {
  courseInfo.forEach((course) => {
    scheduleEl.innerHTML += `
    <tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
    </tr>    `;
  });
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("input", searchSchedule);

//funktion som filtrerar datan från API utifrån input i sökrutan och skriver ut de kurserna i DOM.
async function searchSchedule() {
  try {
    const response = await fetch(
      "https://webbutveckling.miun.se/files/ramschema_ht23.json"
    );
    const courseInfo = await response.json();

    /*skapar en array med de filtrerade resultaten. Filtrerar utifrån att kursnamnet ska innehålla det som skrivits i sökrutan eller att kurskoden ska innehålla det.
    Sätter båda till toLowerCase då funktionen är skiftlägeskänslig. */
    let filteredSchedule = courseInfo.filter((info) => {
      return (
        info.coursename.toLowerCase().includes(`${searchbar.value}`) ||
        info.code.toLowerCase().includes(`${searchbar.value}`)
      );
    });
    //Återställer tidigare innehåll så att inte tidigare resultat också finns kvar
    scheduleEl.innerHTML = "";

    /*Loopar igenom och skriver ut den filtrerade arrayen till DOM */
    filteredSchedule.forEach((course) => {
      scheduleEl.innerHTML += `
        <tr>
          <td>${course.code}</td>
          <td>${course.coursename}</td>
          <td>${course.progression}</td>
        </tr>`;
    });
  } catch (error) {
    console.log("Något gick fel:", error);
  }
}
