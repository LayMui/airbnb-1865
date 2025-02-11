class HostingsController < ApplicationController
  def index
    # @my_listings = current_user.listings
    @hostings = Listing.where(user_id: current_user.id)
    # DEVISE: current_user is a helper method that returns the current signed-in user.
    # User.find(some user id stored inside your cookies)
    # Booking.where(user_id: params[:user_id])
    # users/34/bookings
    @hostings.each do |hosting|
      @bookings = Booking.where(listing_id: hosting.id)
    end
  end
end
