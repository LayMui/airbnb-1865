class ListingsController < ApplicationController

  before_action :authenticate_user!

  def index
    @listings = Listing.all
  end

  def new
    @listing = Listing.new
  end

  def create
    @listing = Listing.new(listings_params)
    @listing.user = current_user
    if @listing.save!
      redirect_to listings_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @listing = Listing.find(params[:id])
  end


  def listings_params
    params.require(:listing).permit(:name, :description, :price, :active, :capacity, :photo)
  end
end
