import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="update-booking-status"
export default class extends Controller {
  static targets = ["bookingStatus", "bookingPendingNumber", "form"]

  connect() {
    console.log("Hello from update_booking_status");
  }

  send(event) {
    event.preventDefault();

    fetch(`${this.formTarget.action}/accept`, {
      method: 'PATCH',
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        // console.log("data is connected to AJAX")

        const updatedStatus = data.updated_status;
        // console.log(updatedStatus);
        this.bookingStatusTarget.innerHTML = updatedStatus;


      })
  };
}

// app/javascript/controllers/booking_status_controller.js
