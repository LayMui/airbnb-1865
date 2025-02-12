// app/javascript/controllers/favorite_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["icon"];

  toggle(event) {
    event.preventDefault();
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
        // Handle the response and toggle the icon if needed
        if (data.bookmarked) {
          this.iconTarget.classList.remove("bi-heart");
          this.iconTarget.classList.add("bi-heart-fill");
        } else {
          this.iconTarget.classList.remove("bi-heart-fill");
          this.iconTarget.classList.add("bi-heart");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }


  connect() {
    console.log('favourite')
  }
}
