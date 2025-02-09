class ListingsController < ApplicationController

  before_action :authenticate_user!

  def index
    @listings = Listing.all
  end

  def new
    @listing = Listing.new
  end

  def show
    @listing = Listing.find(params[:id])
    # unless @user == current_user
      # redirect_to :listings, :alert => "Access denied."
    # end
  end


  def listings_params
    params.require(:listing).permit(:name, :description, :price, :active, :capacity, :photo)
  end
end
