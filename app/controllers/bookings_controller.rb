class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
  end

  def show
    @booking = Booking.find(params[:id])
    @future_bookings = current_user.bookings.where("start_date > ?", Time.current)
    @past_bookings = current_user.bookings.where("end_date < ?", Time.current)
  end

  def new
    @listing = Listing.find(params[:listing_id])
    @booking = @listing.bookings.new
  end

  def create
    @listing = Listing.find(params[:listing_id])
    @booking = @listing.bookings.new(booking_params)

    if @booking.save
      redirect_to booking_path(@booking), notice: "Booking was successfully created."
    else
      redirect_to booking_path(@booking), notice: "Failed to create booking."
      render :new, status: :unprocessable_entity
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:listing_id, :user_id, :start_date, :end_date, :number_of_guests)
  end
end
