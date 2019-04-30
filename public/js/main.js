// Initialize and add the map
function initMap() {
    const budapest = {lat: 47.497913, lng: 19.040236};
    const map = new google.maps.Map(
        document.getElementById('map'),
        {zoom: 10, center: budapest}
    );
    const marker = new google.maps.Marker({position: budapest, map: map});
}
