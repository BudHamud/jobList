let search = document.getElementById("search");
let jobs = ["peluquero", "jardinero", "mozo"];
let cardContainer = document.getElementById('cardContainer')
let borrar = true

search.addEventListener("input", (e) => {
  let value = e.target.value;
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].includes(value)) {
      getJobs(jobs[i]);
    }
    if (borrar === true) {
      cardContainer.innerHTML = "Isn't here";
    }
  }
  borrar = true;
});

function getJobs(e) {
  if (borrar === true) {
    cardContainer.innerHTML = "";
    borrar = false;
  }
  const cardBody = document.createElement("div");
  cardBody.className = "jobCard";
  cardBody.innerHTML = 
  `<h3>${e}</h3>
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <i class="fa-solid fa-star"></i>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem minus accusamus animi recusandae ipsam tempore delectus! Harum consectetur dicta vel, dolore, commodi officia dolores fugit vitae omnis praesentium, voluptas voluptates?</p>
  <button class="about">Contratar</button>`;
  cardContainer.append(cardBody);
}
