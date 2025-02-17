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
        // Get the icon element
        const iconElement = this.iconTarget.querySelector('i') || this.iconTarget;

        // Handle the response and toggle the icon
        if (iconElement.classList.contains('bi')) {
          // Bootstrap Icons
          iconElement.classList.remove(data.bookmarked ? "bi-heart" : "bi-heart-fill");
          iconElement.classList.add(data.bookmarked ? "bi-heart-fill" : "bi-heart");
        } else {
          // Font Awesome
          iconElement.classList.remove(data.bookmarked ? "far fa-heart" : "fas fa-heart");
          iconElement.classList.add(data.bookmarked ? "fas fa-heart" : "far fa-heart");
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
