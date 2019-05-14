import {data} from './data.js'

function loadResultsFromData(data) {
    const container = document.getElementById("results");
    container.innerHTML = "";

    for (let [index, item] of data.entries()) {
        container.innerHTML += `<div class="card mb-1">
  <h5 class="card-header"
   style="cursor: pointer" id="resultHeader${index}"
   data-toggle="collapse"
   data-target="#result${index}"
   aria-expanded="false"
   aria-controls="result${index}"
   onclick="if (window.map && window.geocoder) {
            geocoder.geocode({
                'address': '${item.city}, ${item.address}, Magyarország'
            }, (results, status) => {
                if (status === 'OK') {
                    const position = results[0].geometry.location;
                    const map = window.map;
                    map.setCenter(position);
                    const marker = new google.maps.Marker({position, map});
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }">
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
        <button class="card-link btn btn-link" style="text-decoration: none; text-transform: none" 
        onclick="if (window.map && window.geocoder) {
            geocoder.geocode({
                'address': '${item.city}, ${item.address}, Magyarország'
            }, (results, status) => {
                if (status === 'OK') {
                    const position = results[0].geometry.location;
                    const map = window.map;
                    map.setCenter(position);
                    const marker = new google.maps.Marker({position, map});
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }">Térkép</button>
      </div>
  </div>
</div>`;
    }
}

loadResultsFromData(data);

function populateCitiesFilter() {
    const citySelector = document.getElementById("citySelector");
    const cities = [...new Set(data.map(item => item.city))];
    cities.forEach(city => {
        citySelector.innerHTML += `<option>${city}</option>`;
    });
}

populateCitiesFilter();

function handleCityChange(city) {
    loadResultsFromData(data.filter(entry => entry.city === city));

    if (window.map) {
        const geocoder = new google.maps.Geocoder();
        window.geocoder = geocoder;
        geocoder.geocode({
            'address': `${city}, Magyarország`
        }, (results, status) => {
            if (status === 'OK') {
                window.map.setCenter(results[0].geometry.location);
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    $('#resultsSection').collapse('show');
}

$('#citySelector').change(function () {
    handleCityChange($(this).val());
});

function createLanding() {
    const seenLanding = sessionStorage.getItem("seenLanding");
    if (seenLanding == null || seenLanding !== "true") {
        $('#landingContainer').append(`<div id="landing" class="clearfix">
    <div class="jumbotron clearfix px-3 p-sm-5" id="landingContent">
        <h1 class="display-3">Üdvözlet!</h1>
        <p class="lead">Ez a <strong>pszi-infó</strong>, a társadalombiztosítás (TB) által finanszírozott
            pszichiátriai és pszichoterápiás ellátások országos keresője
        </p>
        <hr class="my-4">
        <p class="lead">Az ellátótérképen és intézménykeresőn túl információs portál is olvasható, valamint
            lehetőség van az adatbázisban nem szereplő intézmények ajánlására is</p>
        <p class="lead">
            <button id="landingButton" class="btn btn-primary btn-lg my-4" role="button">Tovább</button>
        </p>
    </div>
</div>`);
        sessionStorage.setItem("closedLanding", "false");
    }
}

createLanding();

$('#landingButton').click(function () {
    sessionStorage.setItem("closedLanding", "true");
    $('#landingContainer').remove();
});
