function initMap() {
    const budapest = {lat: 47.497913, lng: 19.040236};
    initMapWithPosition(budapest);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            initMapWithPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }

}

function initMapWithPosition(position) {
    const map = new google.maps.Map(
        document.getElementById('map'),
        {zoom: 10, center: position}
    );
    window.map = map;
    const marker = new google.maps.Marker({position, map});
}
