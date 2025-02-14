import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr";

// Connects to data-controller="datepicker"
export default class extends Controller {
  static targets = ["dateInput", "startDate", "endDate"]

  connect() {
    flatpickr(
      this.dateInputTarget,
      {
        mode: "range",
        onChange: (selectedDates, dateStr, instance) => {
          this.startDateTarget.value = selectedDates[0].toISOString()
          if (selectedDates[1]) {
            this.endDateTarget.value = selectedDates[1].toISOString()
          }

          console.log(this.startDateTarget.value)
          console.log(this.endDateTarget.value)
        }
      }
    )
  }
}
