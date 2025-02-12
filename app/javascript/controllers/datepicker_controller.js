import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr";

// Connects to data-controller="datepicker"
export default class extends Controller {
  connect() {
    flatpickr(this.element)

    mode: "range",
      minDate: "today",
        dateFormat: "Y-m-d",
          disable: [
            function (date) {
              // disable every multiple of 8
              return !(date.getDate() % 8);
            }
          ]
  }
}
