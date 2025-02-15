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
Booking.destroy_all
Availability.destroy_all
Listing.destroy_all
Location.destroy_all
User.destroy_all

puts "Creating users..."

guest1 = User.create!(
  username: 'guest1',
  email: 'guest1@example.com',
  password: 'goodguest1'
)

guest2 = User.create!(
  username: 'guest2',
  email: 'guest2@example.com',
  password: 'goodguest2'
)

host1 = User.create!(
  username: 'host1',
  email: 'host1@example.com',
  password: 'goodhost1'
)

host2 = User.create!(
  username: 'host2',
  email: 'host2@example.com',
  password: 'goodhost2'
)

puts "Creating locations..."

location1 = Location.create!(
  country_code: 'SG',
  country_name: 'Singapore'
)

location2 = Location.create!(
  country_code: 'MY',
  country_name: 'Malaysia'
)

puts "Creating listings..."

listing1 = Listing.create!(
  name: 'The Interlace',
  description: 'Mysterious at every turn, The Interlace offers curious minds a labyrinth of possibilities.',
  price: 200,
  active: true,
  capacity: 5,
  address: '180 Depot Road, Singapore 109684',
  user: host1,
  location: location1
)

puts "The Interlace created"

listing2 = Listing.create!(
  name: 'Reflections at Keppel Bay',
  description: 'Offering an amazing view of yourself, Reflections is the perfect place to meditate and face the angels inside you.',
  price: 200,
  active: true,
  capacity: 5,
  address: '1 Keppel Bay View, Singapore 098402',
  user: host1,
  location: location1
)

puts "Reflections created"

listing3 = Listing.create!(
  name: 'Marina One',
  description: 'Marina One is not the only marina in Singapore.',
  price: 350,
  active: true,
  capacity: 4,
  address: '5 Straits View, Singapore 018935',
  user: host2,
  location: location1
)

puts "Marina One created"

puts "Creating bookings..."

booking1 = Booking.create!(
  booking_reference: "BOOK#{rand(1000..9999)}",
  user: guest1,
  listing: listing1,
  start_date: DateTime.now,
  end_date: DateTime.now + 5.days,
  confirmation_status: "pending",
  number_of_guests: 2
)

booking2 = Booking.create!(
  booking_reference: "BOOK#{rand(1000..9999)}",
  user: guest2,
  listing: listing2,
  start_date: DateTime.now + 7.days,
  end_date: DateTime.now + 11.days,
  confirmation_status: "pending",
  number_of_guests: 4
)

booking3 = Booking.create!(
  booking_reference: "BOOK#{rand(1000..9999)}",
  user: guest2,
  listing: listing2,
  start_date: DateTime.now + 20.days,
  end_date: DateTime.now + 28.days,
  confirmation_status: "pending",
  number_of_guests: 3
)

puts "Creating available slots..."

availability1 = Availability.create!(
  listing: listing1,
  start_date: Date.new(2025,1,1),
  end_date: Date.new(2025,2,20)
)

availability2 = Availability.create!(
  listing: listing1,
  start_date: Date.new(2025,3,15),
  end_date: Date.new(2025,4,30)
)

availability3 = Availability.create!(
  listing: listing2,
  start_date: Date.new(2025,1,1),
  end_date: Date.new(2025,4,30)
)

availability4 = Availability.create!(
  listing: listing3,
  start_date: Date.new(2025,2,15),
  end_date: Date.new(2025,5,30)
)

# User.all.each do |user|
  # booking = Booking.create!(
    # booking_reference: "BOOK#{rand(1000..9999)}",
    # user: user,
    # listing: listing,
    # start_date: DateTime.now,
    # end_date: DateTime.now + 5.days,
    # confirmation_status: "pending",
    # number_of_guests: 2
#  )
# end
#
# listing.photo.attach(io: File.open("#{Rails.root}/app/assets/images/san_francisco.jpg"), filename: 'san_francisco.jpg', content_type: 'image/jpg')

puts "Finished! Created #{User.count} users."
puts "Finished! Created #{Location.count} locations."
puts "Finished! Created #{Listing.count} listings."
puts "Finished! Created #{Booking.count} bookings."
puts "Finished! Created #{Availability.count} available slots."
