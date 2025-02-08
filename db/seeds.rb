# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
require "open-uri"
Listing.destroy_all

listing = Listing.new(
  name: 'Light & Spacious Garden Flat London',
  description: 'A lovely summer feel for this spacious garden flat. Two double bedrooms, open plan living area, large kitchen and a beautiful conservatory',
  price: 75,
  active: true,
  capacity: 3
)

listing.photo.attach(io: File.open("#{Rails.root}/app/assets/images/san_francisco.jpg"), filename: 'san_francisco.jpg', content_type: 'image/jpg')
listing.save
