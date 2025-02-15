// app/javascript/controllers/map_controller.js
import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl' // Don't forget this!
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {

  static targets = ["map"];

  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.mapTarget,
      style: "mapbox://styles/mapbox/streets-v10",
      // Add these options to disable the default controls
      attributionControl: false,
      navigationControl: false,
      searchControl: false
    })

    this.#addMarkersToMap()
    this.#fitMapToMarkers()
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

  zoomToAddress(event) {
    event.preventDefault(); // Prevent default link behavior (scrolling, etc.)

    const { lng, lat } = this.markersValue[event.currentTarget.dataset.value]
    this.map.flyTo({
      center: [lng, lat],
      zoom: 16, // Adjust the zoom level as necessary
      speed: 1.2, // Smooth zoom speed
      curve: 1, // Smoother zoom effect
      easing(t) {
        return t;
      },
    });

  }
}
