import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="link-address-to-map"
export default class extends Controller {

  static values = { address: String }

  connect() {
    console.log("hello");

  }

  zoomToAddress(event) {
    event.preventDefault(); // Prevent default link behavior (scrolling, etc.)
    console.log("hello");


    //const address = event.target.dataset.mapAddress; // Get the address from the link's data attribute

    console.log(event.currentTarget.innerText)
    document.querySelector(".mapboxgl-ctrl-geocoder--input").value = "180 Depot Road, Bukit Merah, Singapore 109706"


  }
}
