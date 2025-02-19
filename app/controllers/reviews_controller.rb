class ReviewsController < ApplicationController
  def create
    @booking = Booking.find(params[:booking_id])
    @review = Review.new(review_params.merge(booking: @booking))
    @review.user = current_user
    if @review.save
      redirect_to booking_path(@booking), notice: 'Review was successfully created.'
    else
      redirect_to booking_path(@booking), alert: 'Failed to create review.'
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :comment)
  end
end 