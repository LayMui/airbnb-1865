class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
  end

  def show
    @booking = Booking.find(params[:id])
  end

  def booking_status_update
    raise
    @booking = Booking.find(params[:id])
    @booking.confirmation_status = "confirmed"
    respond_to do |format|
      if @format.save
        format.html { redirect_to hostings_path }
        format.json # Follows the classic Rails flow and look for a create.json view
      else
        format.html { redirect_to hostings_path , status: :unprocessable_entity }
        format.json # Follows the classic Rails flow and look for a create.json view
      end
    end
  end
end
