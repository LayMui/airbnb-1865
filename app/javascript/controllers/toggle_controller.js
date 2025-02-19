import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
  static targets = ["togglableElement"]

  connect() {
    console.log("Hello from toggle controller")
  }

  fire(event) {
    // console.log(this.togglableElementTarget);
    event.preventDefault()
    this.togglableElementTarget.classList.toggle("d-none");
  }
}
