class HostingsController < ApplicationController
  def index
    # @my_listings = current_user.listings
    @hostings = Listing.where(user_id: current_user.id)
  end
end
