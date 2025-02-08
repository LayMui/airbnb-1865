class ListingsController < ApplicationController

  def index
    @listings = Listing.all
  end

  def show
    @listing = Listing.find(params[:id])

  def listings_params
    params.require(:listing).permit(:name, :description, :price, :active, :capacity, :photo)
  end
end
