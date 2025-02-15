class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
  end

  def show
    @booking = Booking.find(params[:id])
  end

  def booking_status_update
    @booking = Booking.find(params[:id])
    # @booking.confirmation_status = booking_params
    respond_to do |format|
      if @booking.update(booking_params)
        format.html { redirect_to hostings_path, notice: 'Booking status was successfully updated.' }
        format.json # Follows the classic Rails flow and look for a create.json view
      else
        format.html { redirect_to hostings_path , status: :unprocessable_entity }
        format.json # Follows the classic Rails flow and look for a create.json view
      end
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:confirmation_status)
  end
end
