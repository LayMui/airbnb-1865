// app/javascript/controllers/favorite_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["icon"];
  static values = {
    isSignIn: Boolean,

  }

  toggle(event) {
    event.preventDefault();

    if (!this.isSignInValue) {
      window.location.replace("/users/sign_in")
      return
    }
    // Toggle the heart icon between filled and unfilled
    // Get the listing ID from the data attribute passed to the element

    const listingId = this.element.getAttribute("data-favorite-listing-id");

    // Send the POST request to bookmark/unbookmark the listing
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch(`/listings/${listingId}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify({
        listing_id: listingId,
      }),
    })
      .then(response => response.json()) // Assuming the server responds with JSON
      .then(data => {
        // Get the icon element
        const iconElement = this.iconTarget.querySelector('i') || this.iconTarget;

        iconElement.classList.toggle("bi-heart");
        iconElement.classList.toggle("bi-heart-fill");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }


  connect() {
    console.log('favourite')
  }
}
