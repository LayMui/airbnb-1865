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
        if (data.bookmarked) {
          if (iconElement.classList.contains('bi')) {
            // Bootstrap Icons
            iconElement.classList.remove("bi-heart");
            iconElement.classList.add("bi-heart-fill");
          } else {
            // Font Awesome
            iconElement.classList.remove("far", "fa-heart");
            iconElement.classList.add("fas", "fa-heart");
          }
        } else {
          if (iconElement.classList.contains('bi')) {
            // Bootstrap Icons
            iconElement.classList.remove("bi-heart-fill");
            iconElement.classList.add("bi-heart");
          } else {
            // Font Awesome
            iconElement.classList.remove("fas", "fa-heart");
            iconElement.classList.add("far", "fa-heart");
          }
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
