class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
  end

  def show
    @booking = Booking.find(params[:id])
    @future_bookings = current_user.bookings.where("start_date > ?", Time.current)
    @past_bookings = current_user.bookings.where("end_date < ?", Time.current)
    @review = @booking.review || Review.new
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
      redirect_to listing_path(@listing), alert: "Sorry, those dates are not available"
    end

  rescue ActiveRecord::RecordInvalid => e
    redirect_to listing_path(@listing), alert: e.message
  end

  def accept
    @booking = Booking.find(params[:id])
    respond_to do |format|
      if @booking.update(booking_status_update_params)
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
    params.require(:booking).permit(:listing_id, :user_id, :start_date, :end_date, :number_of_guests)
  end

  def booking_status_update_params
    params.require(:booking).permit(:confirmation_status)
  end
end
