# app/controllers/bookmarks_controller.rb
class BookmarksController < ApplicationController
  before_action :authenticate_user!  # Ensure the user is logged in

  def index
    # Get all the listings bookmarked by the current user
    @bookmarked_listings = current_user.bookmarked_listings
  end
end
