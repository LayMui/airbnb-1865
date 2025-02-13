// app/javascript/controllers/map_controller.js
import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl' // Don't forget this!
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {

  static targets = ["map", "address"];

  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10"
    })

    this.#addMarkersToMap()
    this.#fitMapToMarkers()


    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }))
  }


  zoomToAddress(event) {
    event.preventDefault(); // Prevent default link behavior (scrolling, etc.)

    const address = event.target.dataset.mapAddress; // Get the address from the link's data attribute

    console.log(address)
    // Use Mapbox Geocoding API to get the coordinates (latitude, longitude) for the address
    this.geocodeAddress(address)
      .then((coordinates) => {
        if (coordinates) {
          this.zoomToCoordinates(coordinates);
        }
      })
      .catch((error) => {
        console.error("Error geocoding the address:", error);
      });
  }

  // Function to call the Mapbox Geocoding API
  async geocodeAddress(address) {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`;

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    // If we have results, return the coordinates (longitude, latitude) of the first result
    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      return [longitude, latitude];
    }

    return null; // If no results are found
  }

  // Function to zoom the map to the given coordinates
  zoomToCoordinates(coordinates) {
    const [longitude, latitude] = coordinates;

    this.map.flyTo({
      center: [longitude, latitude],
      zoom: 16, // Adjust the zoom level as necessary
      speed: 1.2, // Smooth zoom speed
      curve: 1, // Smoother zoom effect
      easing(t) {
        return t;
      },
    });

    // Update marker position
     this.marker.setLngLat([longitude, latitude]);
  }


  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html) // Add this

    // Create a HTML element for your custom marker
    const customMarker = document.createElement("div")
    customMarker.innerHTML = marker.marker_html

      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup) // Add this
        .addTo(this.map)
    });
  }


  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}
