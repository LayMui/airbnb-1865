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
        enable: availableDates.flatMap(range => {
          const dates = []
          let currentDate = new Date(range.from)
          const endDate = new Date(range.to)

          while (currentDate <= endDate) {
            dates.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
          }
          return dates
        })
        disable: unavailableDates
      }
    )
  }
}
