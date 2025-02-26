// app/javascript/controllers/map_controller.js
import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl' // Don't forget this!

export default class extends Controller {

  static targets = ["map"]

  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {


    mapboxgl.accessToken = this.apiKeyValue
    console.log(mapboxgl.supported())

    this.map = new mapboxgl.Map({
      container: this.mapTarget,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [-122.662323, 45.523751], // Default center
      zoom: 12,
      // Add these options to disable the default controls
      attributionControl: false,
      navigationControl: false,
      searchControl: false
    })

    this.#addMarkersToMap()
    this.#fitMapToMarkers()

      // Add click event listener for selecting start and end points
      this.map.on('click', (event) => {
        this.handleMapClick(event)
      })

      // Listen for changes to the transport mode selector
    document.getElementById('transport-mode').addEventListener('change', (e) => {
      this.transportMode = e.target.value
    })

    // Set default transport mode
      this.transportMode = 'cycling'
  }


  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html) // Add this

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

    // Handle map click to set start and end points
    handleMapClick(event) {
      const coords = [event.lngLat.lng, event.lngLat.lat]
  
      // If both start and end points are already set, reset them
      if (this.startPoint && this.endPoint) {
        this.resetRoute()
      }
  
      // Set or update start and end points for directions
      if (!this.startPoint) {
        this.startPoint = coords
        this.addMarker(coords, 'start')
      } else if (!this.endPoint) {
        this.endPoint = coords
        this.addMarker(coords, 'end')
  
        // Fetch and display the route after setting both start and end points
        this.getRoute(this.startPoint, this.endPoint)
      }
    }
  
    // Add a marker to the map
    addMarker(coords, type) {
      const color = type === 'start' ? '#3887be' : '#f30' // Different colors for start and end
      new mapboxgl.Marker({ color })
        .setLngLat(coords)
        .addTo(this.map)
  
      // Optionally display popup or marker label
      if (type === 'start') {
        new mapboxgl.Popup().setHTML("Start").setLngLat(coords).addTo(this.map)
      } else {
        new mapboxgl.Popup().setHTML("End").setLngLat(coords).addTo(this.map)
      }
    }

     // Fetch the route from Mapbox Directions API
  async getRoute(start, end) {

     // Use the selected transport mode (cycling, driving, walking)
     const profile = this.transportMode

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${profile}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    )
    const json = await query.json()
    const data = json.routes[0]
    const route = data.geometry.coordinates

    // Create a geojson feature for the route
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    }

    // Add or update the route layer on the map
    if (this.map.getSource('route')) {
      this.map.getSource('route').setData(geojson)
    } else {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      })
    }

    // Display turn-by-turn instructions
    this.displayInstructions(data.legs[0].steps, data.duration)
  }

  displayInstructions(routeSteps, duration) {
    const instructionsDiv = document.getElementById('instructions')
    let tripInstructions = ''

    // Determine the icon based on the selected transport mode
    let transportIcon;
    switch (this.transportMode) {
      case 'cycling':
        transportIcon = '🚴';
        break;
      case 'driving':
        transportIcon = '🚗';
        break;
      case 'walking':
        transportIcon = '🚶';
        break;
      default:
        transportIcon = '🚴';
    }

    // Build the instructions list
    routeSteps.forEach(step => {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`
    })

    // Insert instructions and duration with the transport icon into the DOM
    instructionsDiv.innerHTML = `
      <p><strong>Trip duration: ${Math.floor(duration / 60)} min ${transportIcon}</strong></p>
      <ol>${tripInstructions}</ol>
    `

    
  }

  resetRoute() {
    // Clear the previous start and end points
    this.startPoint = null
    this.endPoint = null

    // Remove previous markers
    this.map.getSource('route') && this.map.removeLayer('route')
    this.map.getSource('route') && this.map.removeSource('route')

    // Clear the instructions
    const instructionsDiv = document.getElementById('instructions')
    instructionsDiv.innerHTML = ''
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
      essential: true
    });

  }
}
