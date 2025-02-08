class ListingsController < ApplicationController

  def index
    @listings = Listing.all
  end

  def new
    @listing = Listing.new
  end



  def listings_params
    params.require(:listing).permit(:name, :description, :price, :active, :capacity, :photo)
  end
end
