class Listing < ApplicationRecord
  has_one_attached :photo
  belongs_to :user
  has_many :availabilities
  has_many :bookings
  has_many :bookmarks
  has_many :bookmarked_by_users, through: :bookmarks, source: :user
  belongs_to :location
  has_many :reviews, through: :bookings

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  def average_rating
    reviews.average(:rating)&.round(1) || "No reviews"
  end
  
  def unavailable_dates
    bookings.pluck(:start_date, :end_date).map do |start_date, end_date|
      (start_date.to_date..end_date.to_date).map(&:to_s)
    end.flatten
  end
end
