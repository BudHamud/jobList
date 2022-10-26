let search = document.getElementById("search");
let cardContainer = document.getElementById("cardContainer");
let borrar = true;
let jobs = [];
let historyCheck = [];

getHistory();

function getHistory() {
  if (historyCheck.length === 0) {
    cardContainer.innerHTML = "Historial vacío";
  } else {
    cardContainer.innerHTML = ""
    for (let i = 0; i < historyCheck.length; i++) {
      let newCard = document.createElement("div");
      newCard.className = "jobCard";
      newCard.innerHTML = `<div class="headerCard">
    <img src="img/profile.webp" alt="profile img">
    <div class="headerDesc">
    <h3>${historyCheck[i].name}</h3>
    <h4>${historyCheck[i].job}</h4>
    </div>
    <div class="score">
    <h4>${historyCheck[i].score}</h4> <i class="fa-solid fa-star"></i>
    </div>
    </div>
    <div class="footerCard">
    <button class="about">Valorar</button><p>¡Comparte tu experiencia!
    </div>`;
    cardContainer.appendChild(newCard)
    }
  }
}

fetch("api.json")
  .then((resp) => resp.json())
  .then((data) => {
    sortJobs(data);
    jobs = data.map((e) => {
      return e;
    });
  });

function sortJobs(e) {
  e.sort((a, b) => {
    return a.gps - b.gps;
  });
}

search.addEventListener("input", (e) => {
  let value = e.target.value;
  for (let i = 0; i < jobs.length; i++) {
    if (
      jobs[i].job.toLowerCase().includes(value.toLowerCase()) ||
      jobs[i].name.toLowerCase().includes(value.toLowerCase())
    ) {
      getJobs(jobs[i], i);
    }
    if (borrar === true) {
      cardContainer.innerHTML = "No está aqui";
    }
  }
  borrar = true;
});

function getJobs(e, i) {
  if (borrar === true) {
    cardContainer.innerHTML = "";
    borrar = false;
  }
  const cardBody = document.createElement("div");
  cardBody.className = "jobCard";
  cardBody.innerHTML = `<div class="headerCard">
  <img src="img/profile.webp" alt="profile img">
  <div class="headerDesc">
  <h3>${e.name}</h3>
  <h4>${e.job}</h4>
  </div>
  <div class="score">
  <h4>${e.score}</h4> <i class="fa-solid fa-star"></i>
  </div>
  </div>
  <div class="footerCard">
  <button class="about" onclick="show(${i})">Contratar</button><p>Se encuentra a ${e.gps} metros!
  </div>`;
  cardContainer.append(cardBody);
}

function show(e) {
    cardContainer.innerHTML = `
    
    <p>${jobs[e].name}</p>
    <img class="imgCard" src="img/profile.webp">
    <p>${jobs[e].job}</p>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12047.27996474609!2d-58.39846683492518!3d-34.59371519728732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab9a66669bb%3A0xfc022cf5da20c925!2sPeluquer%C3%ADa%20Set!5e0!3m2!1ses!2sar!4v1666745064449!5m2!1ses!2sar" width="200" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    historyCheck.push(jobs[e])
}
