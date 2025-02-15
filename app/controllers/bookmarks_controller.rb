# app/controllers/bookmarks_controller.rb
class BookmarksController < ApplicationController
  before_action :authenticate_user!  # Ensure the user is logged in

  def index
    # Get all the listings bookmarked by the current user
    @bookmarked_listings = current_user.bookmarked_listings

     # The `geocoded` scope filters only listing with coordinates
     @markers = @bookmarked_listings.geocoded.map do |listing|
      {
        lat: listing.latitude,
        lng: listing.longitude,
        info_window_html: render_to_string(partial: "info_window", locals: {listing: listing}),
        marker_html: render_to_string(partial: "marker", locals: {listing: listing}) # Pass t
      }
    end
  end
end
