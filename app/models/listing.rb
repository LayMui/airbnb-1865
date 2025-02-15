class Listing < ApplicationRecord
  has_one_attached :photo
  belongs_to :user
  has_many :availabilities
  has_many :bookings
  has_many :bookmarks
  has_many :bookmarked_by_users, through: :bookmarks, source: :user
  belongs_to :location

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
