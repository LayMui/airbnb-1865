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

    // This method will be triggered when the address is clicked
    async zoomToAddress(event) {
      event.preventDefault();
      const address = this.data.get("mapAddress");
      console.log(address)
      // try {
      //   const result = await this.geocodeAddress(address);
      //   const coordinates = result.geometry.coordinates;

      //   // Zoom to the address location
      //   this.map.flyTo({
      //     center: coordinates,
      //     zoom: 14 // Zoom level
      //   });

      //   // Optionally, add a marker at the location
      //   new mapboxgl.Marker()
      //     .setLngLat(coordinates)
      //     .addTo(this.map);
      // } catch (error) {
      //   console.error("Error geocoding address:", error);
      // }
    }

    // Function to geocode an address using Mapbox Geocoder
    geocodeAddress(address) {
      console.log(address)
      // return new Promise((resolve, reject) => {
      //   this.geocoder.query(address, (err, result) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve(result.result);
      //     }
      //   });
      // });
    }



  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}
