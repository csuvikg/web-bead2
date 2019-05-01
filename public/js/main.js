import {data} from './data.js'

function loadResults() {
    const container = document.getElementById("results");
    container.innerHTML = "";

    for (let [index, item] of data.entries()) {
        container.innerHTML += `<div class="card mb-3">
  <h5 class="card-header" style="cursor: pointer" id="resultHeader${index}" data-toggle="collapse" data-target="#result${index}" aria-expanded="false" aria-controls="result${index}">
    ${item.name} (${item.city})
  </h5>
  <div id="result${index}" class="collapse" aria-labelledby="resultHeader${index}" data-parent="#results">
      <div class="card-body">
        <h5 class="card-title">${item.zipCode} ${item.city}, ${item.address}</h5>
        <h6 class="card-subtitle text-muted">${item.phoneNumber || "Nincs megadva telefonszám"}</h6>
      </div>
      <ul class="list-group list-group-flush">
        ${item.officeHours != null ? "<li class='list-group-item'>Ügyeleti idő: " + item.officeHours + "</li>" : ""}
        ${item.targetGroup != null ? "<li class='list-group-item'>Célcsoport: " + item.targetGroup + "</li>" : ""}
        ${item.referral != null ? "<li class='list-group-item'>Beutaló/előjegyzés: " + item.referral + "</li>" : ""}
        ${item.waitingList != null ? "<li class='list-group-item'>Átlagos várakozás: " + item.waitingList + "</li>" : ""}
      </ul>
      <div class="card-body">
        <a href="${item.website}" target="_blank" rel="noopener noreferrer" class="card-link">Honlap</a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="card-link">Térkép</a>
      </div>
  </div>
</div>`;
    }
}

loadResults();
