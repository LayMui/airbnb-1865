class BookingsController < ApplicationController
  def index
    @bookings = current
  end 

  def show
    @booking = Booking.find(params[:id])
  end
end
