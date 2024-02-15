const scheduleEl = document.getElementById("schedule-list"); //Hämtar schedule-list globalt för att kunna använda i flera funktioner.
const searchbar = document.getElementById("searchbar"); //Hämtar sökrutan
searchbar.addEventListener("input", searchSchedule); //Lägger till en händelselyssnare till sökrutan som vid input kör funktionen searchSchedule
const kurskod = document.getElementById("kurskod");
kurskod.addEventListener("click", sortByCode);
const kursnamn = document.getElementById("kursnamn");
kursnamn.addEventListener("click", sortByName);
const progression = document.getElementById("progression");
progression.addEventListener("click", sortByProgression);

window.onload = init(); //När fönstret laddas ska funktionen init köras.

//I funktionen init körs loadschedule.
async function init() {
  loadSchedule();
}

//Funktion som hämtar json-data och kör funktionen displaySchedule
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

//Funktion som loopar igenom datan och skriver ut den till gränssnittet
function displaySchedule(courseInfo) {
  scheduleEl.innerHTML = "";
  courseInfo.forEach((course) => {
    scheduleEl.innerHTML += `
    <tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
    </tr>    `;
  });
}

//funktion som filtrerar datan utifrån input i sökrutan och skriver ut de kurserna i gränssnittet.
async function searchSchedule() {
  try {
    const response = await fetch(
      "https://webbutveckling.miun.se/files/ramschema_ht23.json"
    );
    const courseInfo = await response.json();
    scheduleEl.innerHTML = "";

    /*skapar en array med de filtrerade resultaten. Filtrerar utifrån att kursnamnet ska innehålla det som skrivits i sökrutan eller att kurskoden ska innehålla det.
    Sätter båda till toLowerCase då funktionen är skiftlägeskänslig. */
    let filteredSchedule = courseInfo.filter((info) => {
      return (
        info.coursename.toLowerCase().includes(`${searchbar.value}`) ||
        info.code.toLowerCase().includes(`${searchbar.value}`)
      );
    });

    /*Loopar igenom och skriver ut den filtrerade arrayen till gränssnittet */
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

//Sorterar på kurskod
async function sortByCode() {
  try {
    const response = await fetch(
      "https://webbutveckling.miun.se/files/ramschema_ht23.json"
    );
    const courseInfo = await response.json();
    scheduleEl.innerHTML = "";
    courseInfo.sort((a, b) => {
      return a.code > b.code ? 1 : -1;
    });
    courseInfo.forEach((course) => {
      scheduleEl.innerHTML += `
          <tr>
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
          </tr>`;
    });
  } catch (error) {
    console.log("Något gick fel");
  }
}

//sorterar på kursnamn
async function sortByName() {
  try {
    const response = await fetch(
      "https://webbutveckling.miun.se/files/ramschema_ht23.json"
    );
    const courseInfo = await response.json();
    scheduleEl.innerHTML = "";
    courseInfo.sort((a, b) => {
      return a.coursename > b.coursename ? 1 : -1;
    });
    courseInfo.forEach((course) => {
      scheduleEl.innerHTML += `
            <tr>
              <td>${course.code}</td>
              <td>${course.coursename}</td>
              <td>${course.progression}</td>
            </tr>`;
    });
  } catch (error) {
    console.log("Något gick fel");
  }
}
//sorterar på progression
async function sortByProgression() {
  try {
    const response = await fetch(
      "https://webbutveckling.miun.se/files/ramschema_ht23.json"
    );
    const courseInfo = await response.json();
    scheduleEl.innerHTML = "";
    courseInfo.sort((a, b) => {
      return a.progression > b.progression ? 1 : -1;
    });
    courseInfo.forEach((course) => {
      scheduleEl.innerHTML += `
              <tr>
                <td>${course.code}</td>
                <td>${course.coursename}</td>
                <td>${course.progression}</td>
              </tr>`;
    });
  } catch (error) {
    console.log("Något gick fel");
  }
}
