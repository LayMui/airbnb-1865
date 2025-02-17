class BookingsController < ApplicationController
  def index
    @bookings = current_user.bookings
  end

  def show
    @booking = Booking.find(params[:id])
  end

<<<<<<< HEAD
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
=======
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
>>>>>>> master
    end
  end

  private

  def booking_params
<<<<<<< HEAD
    params.require(:booking).permit(:confirmation_status)
=======
    params.require(:booking).permit(:listing_id, :user_id, :start_date, :end_date, :number_of_guests)
>>>>>>> master
  end
end
