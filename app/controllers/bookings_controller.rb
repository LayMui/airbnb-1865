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
    @booking = CreateBookingService.(
      @listing, current_user.id, 
      booking_params[:start_date], 
      booking_params[:end_date], 
      booking_params[:number_of_guests]
    )

    if @booking.persisted?
      redirect_to booking_path(@booking), notice: "Booking was successfully created."
    else
      render :new, status: :unprocessable_entity
    end

  rescue ActiveRecord::RecordInvalid => e
    redirect_to listing_path(@listing), alert: e.message
  end

  private

  def booking_params
    params.require(:booking).permit(:listing_id, :user_id, :start_date, :end_date, :number_of_guests)
  end
end
