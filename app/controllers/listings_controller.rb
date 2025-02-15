class ListingsController < ApplicationController

  before_action :authenticate_user!
  before_action :set_listing, only: [:show, :bookmarks]

  def index
    @bookmarked_listings = Listing.all
  end


  def bookmarks
    # Assuming you have a Bookmark model to track the bookmarks
    bookmark = current_user.bookmarks.find_by(listing: @listing)

    if bookmark
      bookmark.destroy
      bookmarked = false
    else
      current_user.bookmarks.create(listing: @listing)
      bookmarked = true
    end

    render json: { bookmarked: bookmarked }
  end

  def new
    @listing = Listing.new
  end

  def create
    @listing = Listing.new(listings_params)
    @listing.user = current_user
    @listing.location = Location.first
    if @listing.save!
      redirect_to listings_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show

  end

  private

  def set_listing
    @listing = Listing.find(params[:id])
  end

  def listings_params
    params.require(:listing).permit(:name, :description, :address, :price, :active, :capacity, :photo)
  end
end
