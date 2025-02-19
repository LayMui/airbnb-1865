import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr"; // You need to import this to use new flatpickr()

export default class extends Controller {
  static targets = ["dateInput", "startDate", "endDate"]

  connect() {
    const unavailableDates = JSON.parse(this.dateInputTarget.dataset.unavailableDates)

    flatpickr(
      this.dateInputTarget,
      {
        mode: "range",
        inline: true,
        onChange: (selectedDates, dateStr, instance) => {
          this.startDateTarget.value = selectedDates[0].toISOString()
          if (selectedDates[1]) {
            this.endDateTarget.value = selectedDates[1].toISOString()
          }
        },
        disable: unavailableDates
      }
    )
  }
}
