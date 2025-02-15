import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  copyUrl(event) {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href)
    
    // Change button text to "Copied!"
    const button = this.buttonTarget
    const originalHTML = button.innerHTML
    button.innerHTML = '<i class="fas fa-share"></i> Copied!'
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalHTML
    }, 2000)
  }
} 