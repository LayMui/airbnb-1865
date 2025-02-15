import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="update-booking-status"
export default class extends Controller {
  static targets = ["bookingStatus", "form"]

  connect() {
    console.log("Hello from update_booking_status");
  }

  send(event) {
    event.preventDefault();
    // console.log();
    // console.log(this.element);
    // console.log(this.bookingStatusTarget);
    // console.log(this.formTarget);
    console.log("TODO: send request in AJAX");
    const formData = new FormData(this.formTarget)
    console.log(formData);
    // console.log(this.formTarget.action);
    fetch(`${this.formTarget.action}/accept`, {
      method: 'PATCH',
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)

        // const updatedStatus = data.updated_status;
        // this.bookingStatusTarget.innerHTML = updatedStatus;

      })
  };
}

// app/javascript/controllers/booking_status_controller.js
