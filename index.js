const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/events";

let events = [];
let selectedEvents;

async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    console.log(result);
    render();
  } catch (err) {
    console.error(err);
  }
}

async function getSingleEvents(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedEvents = result.data;
    console.log(result);
    render();
  } catch (err) {
    console.error(err);
  }
}

function eventsListItem(events) {
  const $li = document.createElement("li");
  $li.innerHTML = `<a href="#selected">${events.name}</a>`;
  $li.addEventListener("click", () => getSingleEvents(events.id));
  return $li;
}

function eventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");
  console.log("This is events list", events);
  const $events = events.map(eventsListItem);
  console.log($events);
  $ul.replaceChildren(...$events);
  return $ul;
}

function eventDetails() {
  if (!selectedEvents) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }
  const $event = document.createElement("section");
  $event.classList.add("artist");
  $event.innerHTML = `
    <h3>${selectedEvents.name} #${selectedEvents.id}</h3>
    <p>${selectedEvents.description}</p>
    `;
  return $event;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Fullstack Convention Center</h1>
      <main>
        <section>
          <h2>Lineup</h2>
          <div id="eventList"></div>
        </section>
        <section id="selected">
          <h2>Event Details</h2>
          <div id="eventDetails"></div>
        </section>
      </main>
    `;
  $app.querySelector("#eventList").replaceWith(eventList());
  $app.querySelector("#eventDetails").replaceWith(eventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
